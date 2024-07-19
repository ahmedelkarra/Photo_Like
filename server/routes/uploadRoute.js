const router = require('express').Router();
const { uploadPhoto } = require('../controllers/uploadController');
const isUser = require('../middleware/isUser');

router.post('/upload', isUser, uploadPhoto);

module.exports = router;
