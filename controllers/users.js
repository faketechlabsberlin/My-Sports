const User = require('../models/User');
const path = require('path')

module.exports.registerForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/register.html'))
}

module.exports.newUser = async(req, res, next) => {
    try {
        const { email, username, password, name, dob, gender, location } = req.body;
        const newUser = new User({email, username, name, dob, gender, location});
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.redirect('/dashboard');
        })
    } catch(e){
        res.redirect('/register');
    }
}

module.exports.loginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/login.html'));
}

module.exports.loginUser = (req, res) => {
    res.redirect('/dashboard');
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
}

