const fileService = require("./fileService");

exports.listUsers = () => {
  // grab the users data from the json file
  const users = fileService.getFileContents("../data/users.json");

  // initialize the response array
  let cleanUserData = [];

  // populate the new array with non-sensitive data (no password and id)
  users.forEach((user) => {
    let userObject = {
      username: user.username,
      email: user.email,
    };
    cleanUserData.push(userObject);
  });

  // return the new array to the API end point
  return cleanUserData;
};
