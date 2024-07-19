const { getUserInfo, updateUserInfo, deleteUser } = require('../controllers/meController');
const router = require('express').Router();

router.get('/me', getUserInfo);

router.put('/me', updateUserInfo);

router.delete('/me', deleteUser);

module.exports = router;
