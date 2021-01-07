const User = require('../models/User');
const helper = require('../utils/helpers');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const SecretCode = require('../models/SecretCode');
const nodemailerSendgrid = require('nodemailer-sendgrid');

module.exports.newUser = async(req, res, next) => {
    try {
        const { email, username, password, name, dob, gender, location, lastName } = req.body;
        const newUser = new User({email, username, name, dob, gender, location, lastName});
        const registeredUser = await User.register(newUser, password);
        const sessionUser = helper.sessionizeUser(registeredUser);
        const code = crypto.randomBytes(16).toString('hex')
        const secret = new SecretCode({user: registeredUser._id, code})
        const secretCode = await secret.save();
        const transport = nodemailer.createTransport(
            nodemailerSendgrid({
                apiKey: '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'
            })
        );
        const mailOptions = { from: 'arsakhrani@gmail.com', to: registeredUser.email, subject: 'My Sports Account Verification', html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/localhost:5000\/api\/users\/confirmation\/' + secretCode.code + '\n' };
        transport.sendMail(mailOptions, function (err) {
            if (err) { console.log('Error occured: ', err) }
        });
        req.session.user = sessionUser;
        res.send(sessionUser);
    } catch(e){
        res.status(400).send(e);
    }
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
} //might not need

