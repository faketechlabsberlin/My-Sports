const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');

router.post('', wrapAsync(userControl.newUser));

router.get('/confirmation/:id', wrapAsync(userControl.confirmEmail));

router.post('/forgotpassword', wrapAsync(userControl.sendForgotPasswordCode));

router.get('/reset/:code', wrapAsync(userControl.verifyForgotPasswordCode));

router.put('/updatepassword', wrapAsync(userControl.saveNewPassword));

module.exports = router;
