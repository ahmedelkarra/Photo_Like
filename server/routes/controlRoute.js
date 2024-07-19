const router = require('express').Router();
const { updatePhoto, deletePhoto } = require("../controllers/controlController");
const isUser = require('../middleware/isUser')


router.put('/control/:id', isUser, updatePhoto);


router.delete('/control/:id', isUser, deletePhoto);

module.exports = router;
