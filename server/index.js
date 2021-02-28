// require dotenv package to read the properties in the .env file.
require("dotenv").config();

//import the express module
const express = require("express");

// import the path utils from Node.
const path = require("path");
const cors = require("cors");

// session module
const cookieSession = require("cookie-session");

// create an instance of express
const app = express();

// import service providers
const loginService = require("./services/loginService");
const signupService = require("./services/signupService");
const userService = require("./services/userService");

// create the PORT variable to be used by the server
const PORT = process.env.PORT || 5000;

// Middleware For Cross Origin Resource SHaring
app.use(cors());

//To get access to the name value pairs send in the message Body of POST Request.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup the cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["randomString", "j0d9120j102d912dj0129dj"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// setup template engine and views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware Serving Static Pages from client directory
app.use(
  express.static(path.join(__dirname, "../client"), {
    extensions: ["html", "htm"],
  })
);

// Routing Middleware.

// ======== Home Page GET ===========
app.get("/", (req, res) => {
  res.render("index", { signedIn: req.session.isValid ? true : false });
});

// ======== Dashboard GET ===========
app.get("/dashboard", (req, res) => {
  // check if user tries to access dashboard while not authenticated
  if (req.session.isValid) {
    res.render("dashboard");
  } else {
    res.redirect("login");
  }
});

// ======== Signup GET ===========
app.get("/signup", (req, res) => {
  res.render("signup", {
    usernameWarning: "",
    emailWarning: "",
    passwordWarning: "",
    username: "",
    email: "",
    password: "",
  });
});

// ======== Signup POST ===========
app.post("/signup", (req, res) => {
  const credentials = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  // use sign up service and obtain response from it
  const signupRequest = signupService.signup(credentials);
  const {
    success,
    usernameWarning,
    emailWarning,
    passwordWarning,
  } = signupRequest;

  // if successful redirect to login, otherwise render signup page again with errors
  if (success) {
    res.redirect("login");
  } else {
    res.render("signup", {
      usernameWarning,
      emailWarning,
      passwordWarning,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  }
});

// ======== Login GET ===========
app.get("/login", (req, res) => {
  res.render("login", {
    passwordWarning: "",
    emailWarning: "",
    email: "",
    password: "",
  });
});

// ======== Login POST ===========
app.post("/login", (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  // use login service and obtain response from it
  const isValidUser = loginService.authenticate(credentials);

  // if login is successful and there is no session, create a new one and redirect to dashboard
  if (isValidUser.user !== null) {
    if (!req.session.isValid) {
      req.session.isValid = true;
    }
    res.redirect("dashboard");
    // if login fails re-render login page with errors
  } else {
    const { emailWarning, passwordWarning } = isValidUser;
    res.render("login", {
      emailWarning,
      passwordWarning,
      email: req.body.email,
      password: req.body.password,
    });
  }
});

// ======== Logout GET ===========
app.get("/logout", (req, res) => {
  // delete the session cookie and redirect to the home page
  req.session = null;
  res.redirect("/");
});

// ======== Users GET ===========
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/users.html"));
});

// ======== Users API GET (/api/v1/users) ===========
app.get("/api/v1/users", (req, res) => {
  // use the users service provider to get data back and send the json data to the client
  const users = userService.listUsers();
  res.json(users);
});

// Final Middleware
// Catch all for any request not handled.
// Returns 404 Page from the client directory.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

// Tell express app to listen for incomming request on a specific PORT
app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});
