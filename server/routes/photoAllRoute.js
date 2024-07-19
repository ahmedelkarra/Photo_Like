const { getAllPhotos } = require('../controllers/photoAllController');
const router = require('express').Router();

router.get('/all', getAllPhotos);

module.exports = router;
