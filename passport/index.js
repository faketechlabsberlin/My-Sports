const passport = require('passport'); //for registration and login functinons

const SignupStrategy = require('./SignupStrategy');
const SigninStrategy = require('./SigninStrategy');

passport.use('local-signin', SigninStrategy);
passport.use('local-signup', SignupStrategy);

module.exports = passport;