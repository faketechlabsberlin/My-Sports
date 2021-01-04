const User = require('../models/User');
const helper = require('../utils/helpers');

module.exports.newUser = async(req, res, next) => {
    try {
        const { email, username, password, name, dob, gender, location } = req.body;
        const newUser = new User({email, username, name, dob, gender, location});
        const registeredUser = await User.register(newUser, password);
        const sessionUser = helper.sessionizeUser(registeredUser);
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

