/* 
       Read and Write File Utility
       Commonjs Modules
       exports.funcName = ()=>{}

       import
       require('module name)
    
*/

const fs = require("fs");
const path = require("path");

// method to get the contents of a local json file
exports.getFileContents = (filePath) => {
  let fileContents = JSON.parse(
    fs.readFileSync(path.join(__dirname, filePath))
  );
  return fileContents;
};

// method to append data to an existing local json file
exports.writeFileContents = (filePath, data) => {
  fileContents = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, filePath), fileContents);
};
