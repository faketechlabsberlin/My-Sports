const Chatroom = require('../models/Chatroom');

exports.createChatroom = async (req, res) => {
    const { chatroomName } = req.body;
    const chatroom = new Chatroom({
        name: chatroomName
    })
    await chatroom.save();
}

