const router = require('express').Router()
const isUser = require('../middleware/isUser')
const PhotoSchema = require('../models/photoSchema')
const fs = require('fs')
const path = require('path')


router.put('/control/:id', isUser, async function (req, res) {
    const { title, body } = req.body
    const id = req.params.id
    try {
        await PhotoSchema.findByIdAndUpdate(id, { title, body })
        res.status(200).json({ message: 'Photo has been updated' })
    } catch (error) {
        res.status(404).json({ message: 'Photo not found' })
    }
});


router.delete('/control/:id', isUser, async function (req, res) {
    const id = req.params.id
    try {
        const photoInfo = await PhotoSchema.findByIdAndDelete(id)
        fs.unlinkSync(path.join(__dirname, `../upload/${photoInfo.url}`))
        res.status(200).json({ message: 'Photo has been deleted' })
    } catch (error) {
        res.status(404).json({ message: 'Photo not found' })
    }
});

module.exports = router;
