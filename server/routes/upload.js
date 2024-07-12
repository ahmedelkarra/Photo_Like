const router = require('express').Router()



router.post('/upload', function (req, res) {
    res.send('Upload post Route');
});

module.exports = router;
