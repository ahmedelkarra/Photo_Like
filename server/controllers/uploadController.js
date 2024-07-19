const router = require('express').Router()
const multer = require('multer')
const isUser = require('../middleware/isUser')
const PhotoSchema = require('../models/photoSchema')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage(
    {
        filename: (req, file, cb) => {
            const fileExt = file.originalname.split('.')
            const ext = fileExt[fileExt.length - 1]
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + `.${ext}`)
        },
        destination: (req, file, cb) => {
            cb(null, 'upload/')
        }
    }
)

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('Only png or jpeg are accepted for uploading'))
        }
    }
}).single('image')


const uploadPhoto = async (req, res) => {
    const host = `${req.protocol}://${req.get('host')}`
    const { _id, fName, lName } = req.userInfo
    if (_id) {
        upload(req, res, async (err) => {
            const title = req.body.title
            const body = req.body.body
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message })
            } else if (err) {
                return res.status(403).json({ message: err.message })
            } else {
                const imageName = req.file.filename
                try {
                    await PhotoSchema.create({ title: title, body: body, author: _id, fName: fName, lName: lName, url: `${host}/image/${imageName}`, imageName: imageName })
                    return res.status(201).json({ message: 'Photo has been uploaded' })
                } catch (error) {
                    fs.unlinkSync(path.join(__dirname, `../upload/${imageName}`))
                    return res.status(400).json({ message: 'Something went wrong' })
                }
            }
        })
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
}

module.exports = { uploadPhoto };