const mongoose = require('mongoose');

const banSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
    reason: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('ban', banSchema);