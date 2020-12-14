require('dotenv').config(); //for future environmental variables

const session = require('express-session'); //for suppoer with cookies 
const MongoStore = require('connect-mongo')(session); 
const express = require('express'); //server framework
const app = express();
const mongoose = require('mongoose'); //library to facilitate DB communications
const path = require('path');
const port = process.env.PORT || 3000;
const passport = require('passport'); //for registration and login functinons
const localStrategy = require('passport-local'); //local strategy, facebook and google logins can be implemented later


app.get('/', function (req, res) {
    res.send('Hello World')
  })
   
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
}) //server running on localhost:3000