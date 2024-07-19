const { loginUser } = require('../controllers/loginController');
const router = require('express').Router();


router.post('/login', loginUser);

module.exports = router;
