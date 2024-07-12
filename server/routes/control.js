const router = require('express').Router()



router.put('/control', function (req, res) {
    res.send('Control put Route');
});

router.delete('/control', function (req, res) {
    res.send('Control delete Route');
});

module.exports = router;
