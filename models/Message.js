const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Chatroom is required!',
        ref: 'Chatroom'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required',
        ref: 'Users'
    },
    message: {
        type: String,
        required: 'Message is required'
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;