const router = require('express').Router()
const multer = require('multer')
const isUser = require('../middleware/isUser')

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


router.post('/upload', isUser, function (req, res) {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ message: err.message })
        } else if (err) {
            res.status(403).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'Photo has been uploaded' })
        }
    })
});

module.exports = router;
