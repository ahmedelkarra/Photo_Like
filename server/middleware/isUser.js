const UserSchema = require('../models/userSchema')
const { tokenVerify } = require('../helper/token')
const router = require('express').Router()


router.use(async (req, res, next) => {
    const token = req.headers.authorization
    const data = tokenVerify(token)
    if (data) {
        try {
            const user = await UserSchema.findById(data._id).select(['_id', 'fName', 'lName', 'email'])
            if (user) {
                req.userInfo = user
                next()
            } else {
                return res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            return res.status(400).json({ message: 'Something went wrong' })
        }
    } else {
        return res.status(404).json({ message: 'Wrong email or password' })
    }
})


module.exports = router