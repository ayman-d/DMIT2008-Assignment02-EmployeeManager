/* 
  Login Service Will Authenticate an email and password
  return a true or false response.
  false returns will keep users on the login page with errors
  true will redirect user to the dashboard.html
*/
const fileService = require("./fileService");

exports.authenticate = (credentials) => {
  const { email, password } = { ...credentials };

  // grab the users data from the json file
  const users = fileService.getFileContents("../data/users.json");

  // reduce the array to check if email and password are provided and match a user object in the data
  const authUser = users.reduce(
    (authObj, user) => {
      if (user.email === email.trim()) {
        authObj.isValidEmail = true;
      }
      if (user.password === password.trim()) {
        authObj.isValidPassword = true;
      }
      if (authObj.isValidEmail && authObj.isValidPassword) {
        authObj.user = user;
      }
      return authObj;
    },
    { isValidEmail: false, isValidPassword: false, user: null }
  );

  // return response with user data if valid, otherwise return error details
  const auth0 = authUser.user ? authUser.user : formatErrors(authUser);
  return auth0;
};

// format the error object
const formatErrors = function (user) {
  let passwordWarning = "";
  let emailWarning = "";

  if (!user.isValidPassword) {
    passwordWarning = "incorrect password";
  }

  if (!user.isValidEmail) {
    emailWarning = "incorrect/unregistered email";
  }

  return { user: null, emailWarning, passwordWarning };
};
