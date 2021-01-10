const User = require('../models/User');
const helper = require('../utils/helpers');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const SecretCode = require('../models/SecretCode');
const nodemailerSendgrid = require('nodemailer-sendgrid');

module.exports.newUser = async(req, res, next) => {
    try {
        const { email, username, password, name, dob, gender, location, lastName } = req.body;
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            res.status(401).send({ message: 'The email address entered is already registered'});
        } else {
            const usernameCheck = await User.findOne({ username });
            if (usernameCheck) {
                res.status(401).send({ message: 'The username entered is already registered'});
            } else {
                const newUser = new User({email, username, name, dob, gender, location, lastName});
                const registeredUser = await User.register(newUser, password);
                const sessionUser = helper.sessionizeUser(registeredUser);
                const code = crypto.randomBytes(16).toString('hex');
                const secret = new SecretCode({user: registeredUser._id, code});
                const secretCode = await secret.save();
                const transport = nodemailer.createTransport(
                    nodemailerSendgrid({
                        apiKey: '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' //hide this soon
                    })
                );
                const mailOptions = { from: 'arsakhrani@gmail.com', to: registeredUser.email, subject: 'My Sports Account Verification', html: 'Hello,\n\n' + 'Thank you for joining My Sports! We are glad to have you on board. Please verify your account by clicking the following link: \nhttp:\/\/localhost:5000\/api\/users\/confirmation\/' + secretCode.code + '\n' };
                transport.sendMail(mailOptions, function (err) {
                    if (err) { console.log('Error occured: ', err) } //account will be active with or without verification for now, no need for erro rhandlng here.
                });
                req.session.user = sessionUser;
                res.send(sessionUser);
            }
        }
    } catch(e){
        res.status(400).send({ message: 'Something went wrong!' });
    }
}

module.exports.confirmEmail = async(req, res, next) => {
    try {
        const code  = req.params.id
        const secret = await SecretCode.findOne({ code });
        const user = await User.findById(secret.user);
        user.accountConfirmed = true;
        await user.save();
        res.redirect('http://localhost:3000/dashboard');
    } catch (err) {
        res.status(400).send({ message: 'Something went wrong!' });
    }
}

module.exports.sendForgotPasswordCode = async(req, res, next) => {
    try {
        const { email }  = req.body
        const user = await User.findOne({ email });
        if (!user) {
            res.status(403).send({ message: 'The email address entered was not found in our database' });
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
        res.status(400).send({ message: 'Something went wrong!' });
    }
}

module.exports.verifyForgotPasswordCode = async(req, res, next) => {
    try {
        const code  = req.params.code
        const secret = await SecretCode.findOne({ code });
        if (!secret) {
            res.status(403).send({ message: 'The provided link is invalid or expired'})
        } else {
            const user = await User.findById(secret.user);
            res.send(user.username);
        }
    } catch (err) {
        res.status(400).send({ message: 'Something went wrong!' });
    }
}

module.exports.saveNewPassword = async(req, res, next) => {
    try {
        const {username, password}  = req.body;
        const user = await User.findOne({ username });
        await user.setPassword(password);
        await user.save();
        res.send({ message: 'password updated' });
    } catch (err) {
        res.status(400).send({ message: 'Something went wrong!' });
    }
}
