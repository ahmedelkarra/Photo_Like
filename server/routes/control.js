const router = require('express').Router()
const isUser = require('../middleware/isUser')
const PhotoSchema = require('../models/photoSchema')
const fs = require('fs')
const path = require('path')


router.put('/control/:id', isUser, async function (req, res) {
    const { title, body } = req.body
    const idParam = req.params.id
    const { _id } = req.userInfo
    if (title && title.length <= 20 && body && body.length <= 50) {
        try {
            await PhotoSchema.findOneAndUpdate({ _id: idParam, author: _id }, { title, body })
            return res.status(200).json({ message: 'Photo has been updated' })
        } catch (error) {
            return res.status(404).json({ message: 'Photo not found' })
        }
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
});


router.delete('/control/:id', isUser, async function (req, res) {
    const idParam = req.params.id
    const { _id } = req.userInfo
    try {
        const photoInfo = await PhotoSchema.findByIdAndDelete({ _id: idParam, author: _id })
        fs.unlinkSync(path.join(__dirname, `../upload/${photoInfo.imageName}`))
        return res.status(200).json({ message: 'Photo has been deleted' })
    } catch (error) {
        return res.status(404).json({ message: 'Photo not found' })
    }
});

module.exports = router;
