const router = require('express').Router();
const { getLikes, toggleLike } = require('../controllers/likeController');
const isUser = require('../middleware/isUser')

router.get('/like', getLikes);

router.post('/like/:id', isUser, toggleLike);

module.exports = router;
