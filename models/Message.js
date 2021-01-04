const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Event is required!',
        ref: 'Event'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required',
        ref: 'User'
    },
    message: {
        type: String,
        required: 'Message is required'
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;