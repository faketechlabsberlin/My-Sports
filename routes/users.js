const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');

router.route('/register')
    .get(userControl.registerForm)
    .post(wrapAsync(userControl.newUser));

router.route('/login')
    .get(userControl.loginForm)
    .post(passport.authenticate('local', { failureRedirect: '/login' }), userControl.loginUser);

router.get('/logout', userControl.logoutUser)

module.exports = router;
