const router = require('express').Router()



router.get('/', function (req, res) {
    res.send('Photos get Route');
});

module.exports = router;
