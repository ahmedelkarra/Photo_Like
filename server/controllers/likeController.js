const router = require('express').Router()
const isUser = require('../middleware/isUser');
const LikeSchema = require('../models/likeSchema');
const PhotoSchema = require('../models/photoSchema');


const getLikes = async (req, res) => {
    try {
        const likes = await LikeSchema.find({})
        if (likes) {
            return res.status(200).json({ message: likes })
        } else {
            return res.status(404).json({ message: 'Photo not found' })
        }
    } catch (error) {
        return res.status(404).json({ message: 'Photo not found' })
    }
};

const toggleLike = async (req, res) => {
    const { _id } = req.userInfo
    const photoId = req.params.id

    if (_id && photoId) {
        try {
            const photo = await PhotoSchema.findById(photoId)
            if (photo) {
                const isLiked = await LikeSchema.findOne({ photoId: photoId, author: _id })
                if (isLiked) {
                    await LikeSchema.findOneAndDelete({ photoId: photoId, author: _id })
                    return res.status(200).json({ message: 'Like has been deleted' })
                } else {
                    const likes = await LikeSchema.create({ author: _id, photoId: photoId })
                    if (likes) {
                        return res.status(201).json({ message: 'Like has been added' })
                    } else {
                        return res.status(403).json({ message: 'You can not add like' })
                    }
                }
            }
        } catch (error) {
            return res.status(404).json({ message: 'Photo not found' })
        }
    } else {
        return res.status(400).json({ message: 'Something went wrong' })
    }
};


module.exports = { getLikes, toggleLike };