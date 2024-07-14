const router = require('express').Router()
const isUser = require('../middleware/isUser')
const PhotoSchema = require('../models/photoSchema')


router.get('/all', async function (req, res) {
    try {
        const userPhotos = await PhotoSchema.find({})
        return res.status(200).json({ message: userPhotos })
    } catch (error) {
        return res.status(404).json({ message: "don't have photos" })
    }
});

module.exports = router;
