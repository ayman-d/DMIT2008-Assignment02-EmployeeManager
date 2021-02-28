const fileService = require("./fileService");
const { v4: uuidv4 } = require("uuid");

exports.signup = (credentials) => {
  const { username, email, password } = { ...credentials };

  // grab the users data from the json file
  const users = fileService.getFileContents("../data/users.json");

  // initialize the values for duplicate and email/password text value
  let duplicateFound = false;
  let usernameWarning =
    username.trim() === "" ? "Please provide a username" : "";
  let emailWarning = email.trim() === "" ? "Please provide an email" : "";
  let passwordWarning =
    password.trim() === "" ? "Please provide a password" : "";

  // response if email already exists
  users.forEach((user) => {
    if (user.email === email.trim()) {
      duplicateFound = true;
      emailWarning = "Email already in use";
    }
  });

  // check if any field is left empty
  if (username === "" || email === "" || password === "") {
    return { success: false, usernameWarning, emailWarning, passwordWarning };
    // check if email already exists
  } else if (duplicateFound) {
    return { success: false, usernameWarning, emailWarning, passwordWarning };
    // if validated, create a new user object with a new ID
  } else {
    const newUser = {
      id: uuidv4(),
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    // add the new user object to the users array
    users.push(newUser);

    // write the new array back to the users json file
    fileService.writeFileContents("../data/users.json", users);

    // return the response object back to the API end point
    return { success: true, usernameWarning, emailWarning, passwordWarning };
  }
};
