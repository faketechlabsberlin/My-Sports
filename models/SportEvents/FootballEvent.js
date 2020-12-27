const mongoose = require('mongoose');

const footballEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    host: {
        type: String,
        required: 'Host is required'
    },
    size: {
        type: Number,
        required: 'Size is required'
    },
    time: {
        type: String,
        required: 'Time is required'
    },
    date: {
        type: Date,
        required: 'Date is required'
    },
    location: {
        type: String,
        required: 'Location is required'
    },
    teammates: [{
        type: mongoose.Schema.Types.ObjectId,
        required: 'Teammate is required',
        ref: 'User'
    }],
    skill: {
        type: Number
    },
    equipment : {
        type: Boolean,
        default: false
    },
    active : {
        type: Boolean,
        default: true
    }
})

const FootballEvent = mongoose.model('FootballEvent', footballEventSchema);

module.exports = FootballEvent;