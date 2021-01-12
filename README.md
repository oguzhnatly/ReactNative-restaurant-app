# Multiplatform Mobile App Development with React Native

Topics covered in this section are:

-   Using Create-react-app
-   Integrating git, npm and using NodeJs
-   Integrating various packages
-   Project involved Creating the UI for a restaurant Using React Native
-   Instructor - `Professor Jogesh Muppala`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### 1. Start json-server
First of all, you must use the script below in order to connect database:
```sh
$ cd json-server 
# (replace * it with your computers IP address)
$ json-server --host 192.1*.*.* --watch db.json -p 3001 -d 2000
```
If you want, you can customize npm json-server command in package.json file. Just change example IP address with your computers IP address.

### 2. Start project
Start project in your terminal using `yarn start`, `npm start` or `expo start`.

### 3. Run expo
Install and run expo on your android or ios device to view the app.

### 4. Build the app
Builds the app for production to the `build` folder. It correctly bundles React Native in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.
```sh
$ npm run build
```
