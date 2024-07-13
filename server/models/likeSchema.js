const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema(
    {
        author: { type: String, required: true, ref: 'User' },
        photoId: { type: String, required: true, ref: 'Photo' },
    }, { timestamps: true }
)

const LikeSchema = mongoose.model('likes', likeSchema)

module.exports = LikeSchema