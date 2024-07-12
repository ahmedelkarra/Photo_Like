const UserSchema = require('../models/userSchema')
const { tokenVerify } = require('../helper/token')
const router = require('express').Router()


router.use(async (req, res, next) => {
    const token = req.cookies.token
    const data = tokenVerify(token)
    if (data) {
        try {
            const user = await UserSchema.findById(data._id)
            if (user) {
                next()
            } else {
                res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            res.status(400).json({ message: 'Something went wrong' })
        }
    } else {
        res.status(404).json({ message: 'Wrong email or password' })
    }
})


module.exports = router