const router = require('express').Router()
const isUser = require('../middleware/isUser')
const PhotoSchema = require('../models/photoSchema')


router.get('/', isUser, async function (req, res) {
    const { _id } = req.userInfo
    try {
        const userPhotos = await PhotoSchema.find({ author: _id })
        res.status(200).json({ message: userPhotos })
    } catch (error) {
        res.status(404).json({ message: 'User not found' })
    }
});

module.exports = router;
