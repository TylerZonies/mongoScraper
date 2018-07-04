const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    _articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('Comment', commentSchema)