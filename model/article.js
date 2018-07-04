const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
        unique: { index: { unique: true } }
    },
    summary: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Article', articleSchema);