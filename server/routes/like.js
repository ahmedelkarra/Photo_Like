const router = require('express').Router()
const isUser = require('../middleware/isUser');
const LikeSchema = require('../models/likeSchema');
const PhotoSchema = require('../models/photoSchema');


router.get('/like', async function (req, res) {
    try {
        const likes = await LikeSchema.find({})
        if (likes) {
            res.status(200).json({ message: likes })
        } else {
            res.status(404).json({ message: 'Photo not found' })
        }
    } catch (error) {
        res.status(404).json({ message: 'Photo not found' })
    }
});

router.post('/like/:id', isUser, async function (req, res) {
    const { _id } = req.userInfo
    const photoId = req.params.id

    if (_id && photoId) {
        try {
            const photo = await PhotoSchema.findById(photoId)
            if (photo) {
                const isLiked = await LikeSchema.findOne({ photoId: photoId, author: _id })
                if (isLiked) {
                    await LikeSchema.findOneAndDelete({ photoId: photoId, author: _id })
                    res.status(200).json({ message: 'Like has been deleted' })
                } else {
                    const likes = await LikeSchema.create({ author: _id, photoId: photoId })
                    if (likes) {
                        res.status(201).json({ message: 'Like has been added' })
                    } else {
                        res.status(403).json({ message: 'You can not add like' })
                    }
                }
            }
        } catch (error) {
            res.status(404).json({ message: 'Photo not found' })
        }
    } else {
        res.status(400).json({ message: 'Something went wrong' })
    }
});


module.exports = router;
