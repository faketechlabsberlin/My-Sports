const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');
const SecretCode = require('../models/SecretCode');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { update } = require('../models/User');

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

router.post('/forgotpassword', async (req, res) => {
  try {
    const { email }  = req.body
    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).send('email not found');
    } else {
      const code = crypto.randomBytes(20).toString('hex');
      const secret = new SecretCode({user: user._id, code})
      const secretCode = await secret.save();
      const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: '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'
        })
    );
    const mailOptions = { from: 'arsakhrani@gmail.com', to: user.email, subject: 'My Sports Account Password Reset', html: 'Hello,\n\n' + 'You are recieving this because you (or someone else) has requuested a password reset. If you have not done so, please ignore this email. If you have requested a password reset, please click on the following link: \nhttp:\/\/localhost:3000\/passwordreset\/' + secretCode.code + '\n' };
    transport.sendMail(mailOptions, function (err) {
        if (err) { console.log('Error occured: ', err) }
    });
    res.status(200).send('The recovery email sent')
    }
  } catch (err) {
    res.status(401).send(err);
  }
});


router.get('/reset/:code', async (req, res) => {
  try {
    const code  = req.params.code
    const secret = await SecretCode.findOne({ code });
    const user = await User.findById(secret.user);
    res.send(user.username);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.put('/updatepassword', async (req, res) => {
  try {
    const {username, password}  = req.body
    const user = await User.findOne({username})
    await user.setPassword(password)
    await user.save();
    res.send({ message: 'password updated' })
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
