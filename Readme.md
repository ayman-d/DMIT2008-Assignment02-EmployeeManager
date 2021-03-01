# Employee Manager App

- [Overview](#overview)
- [Purpose](#purpose)
- [How to run](#running-the-project)
- [Dependancies](#dependancies)
- [Contributors](#contributors)

---

### Overview

This app was built with the purpose of managing employee data within the company with regards to their details and statuses.

Currently, the app has the following features: 

1. Ability to register new users
    - User must provide a valid username, email, and password
    - Error messages will be displayed for any invalid inputs
    - Once successful, the user will be redirected to the login page to enter their credentials
    <img src="https://puu.sh/HkZlW/40868250dc.png" alt="signup page" />
    
2. Ability to login users
    - User must provide valid email and password
    - Error messages will be displayed for any invalid inputs
    - Once successful, the user will be redirected to the protected dashboard page after authentication
    <img src="https://puu.sh/HkZol/626982a982.png" alt="login page" />

3. Home page

4. Dashboard page (placeholder for future content)

5. Users API
    - An open route providing a view of all current users names and emails. This data is retrieved from the users API
    <img src="https://puu.sh/Hl1Yq/2dfdcaf897.png" alt="users page" />

6. User session
    - The app will keep track of the logged in user's session and not require them to login again if the session is still valid
    - The navigation menu will change based on the user's session validity.
    - User session will expire after a certain amount of time, or if the user clicks on the Logout button
    <img src="https://puu.sh/Hl231/7281ab105e.png" alt="logged out nav" />
    <img src="https://puu.sh/Hl24j/ec59aa080e.png" alt="logged in nav" />
    
---

### Purpose

This app is made for the purpose of managing employee details, financial data, and keeping a live record of each employee through the company's portal.

---

### Running the project

The repo does not include the node_modules, please run `npm install` in the main project 
directory if you wish to clone it and run it locally

The package.json is already configured with:
- `npm run server` command to run the project in development
- `npm start` to run the application in production

This project also requires the
[Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) extension. 
If you use it on VS Code, make sure to turn on "watch sass" option when editing the scss style sheets

---

### Dependancies

- Production

| Package                        | Purpose                                                       |
|--------------------------------|---------------------------------------------------------------|
| express                        | Node JS framework to run server side code                     |
| cors                           | Allows cross server communication                             |
| ejs                            | JS view template renderer                                     |
| cookie-session                 | To maintain user's session while logged in                    |
| uuid                           | To create long string id numbers                              |


- Development

| Package                        | Purpose                                                       |
|--------------------------------|---------------------------------------------------------------|
| Nodemon                        | Package to automatically restart server upon changes          |

---

### Contributors

- [Ayman Al-Dali](https://github.com/ayman-d) :octocat:

---
