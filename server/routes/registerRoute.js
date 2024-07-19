const { registerUser } = require('../controllers/registerController');
const router = require('express').Router();

router.post('/register', registerUser);

module.exports = router;
