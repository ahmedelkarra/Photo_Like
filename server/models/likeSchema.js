const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema(
    {
        author: { type: String, required: true, ref: 'User' },
        photo: { type: String, required: true, ref: 'Photo' },
    }, { timestamps: true }
)

const LikeSchema = mongoose.model('Photo', likeSchema)

module.exports = LikeSchema