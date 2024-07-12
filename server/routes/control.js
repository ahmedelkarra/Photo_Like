const router = require('express').Router()
const isUser = require('../middleware/isUser')
const PhotoSchema = require('../models/photoSchema')




router.put('/control', isUser, async function (req, res) {
    const { _id, title, body } = req.body
    try {
        const userPhotos = await PhotoSchema.findByIdAndUpdate(_id, { title, body })
        res.status(200).json({ message: 'Photo has been updated' })
    } catch (error) {
        res.status(404).json({ message: 'Photo not found' })
    }
});





router.delete('/control', isUser, async function (req, res) {
    res.send('Control delete Route');
});

module.exports = router;
