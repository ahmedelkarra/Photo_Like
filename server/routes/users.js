const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  return res.send('respond with a resource');
});

module.exports = router;
