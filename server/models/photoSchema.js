const mongoose = require('mongoose')


const photoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxlength: 20 },
        body: { type: String, required: true, maxlength: 50 },
        url: { type: String, required: true },
        author: { type: String, required: true, ref: 'User' },
    }, { timestamps: true }
)

const PhotoSchema = mongoose.model('Photo', photoSchema)

module.exports = PhotoSchema