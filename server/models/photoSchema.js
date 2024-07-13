const mongoose = require('mongoose')


const photoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxlength: 20 },
        body: { type: String, required: true, maxlength: 50 },
        imageName: { type: String, required: true },
        url: { type: String, required: true },
        author: { type: String, required: true, ref: 'User' },
        fName: { type: String, required: true, ref: 'User' },
        lName: { type: String, required: true, ref: 'User' },
    }, { timestamps: true }
)

const PhotoSchema = mongoose.model('Photo', photoSchema)

module.exports = PhotoSchema