const router = require('express').Router();
const { getUserPhotos } = require('../controllers/photoController');
const isUser = require('../middleware/isUser');

router.get('/', isUser, getUserPhotos);

module.exports = router;
