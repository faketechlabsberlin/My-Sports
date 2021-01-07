const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');
const SecretCode = require('../models/SecretCode');
const User = require('../models/User');

router.post('', wrapAsync(userControl.newUser))

router.get('/confirmation/:id', async (req, res) => {
    try {
      const code  = req.params.id
      const secret = await SecretCode.findOne({ code });
      const user = await User.findById(secret.user);
      user.accountConfirmed = true;
      await user.save();
      res.redirect('http://localhost:3000/dashboard');
    } catch (err) {
      res.status(401).send(err);
    }
});

module.exports = router;
