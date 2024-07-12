const router = require('express').Router()



router.get('/like', function (req, res) {
    res.send('Likes get Route');
});

router.post('/like', function (req, res) {
    res.send('Likes post Route');
});

router.delete('/like', function (req, res) {
    res.send('Likes delete Route');
});

module.exports = router;
