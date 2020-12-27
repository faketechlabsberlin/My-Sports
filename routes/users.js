const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');

router.post('', wrapAsync(userControl.newUser))

module.exports = router;
