const { tokenVerify } = require('../middleware/token')
const UserSchema = require('../models/userSchema')
const router = require('express').Router()


router.get('/me', async (req, res) => {
    const token = req.cookies.token
    const data = tokenVerify(token)
    if (data) {
        try {
            const user = await UserSchema.findOne(data.user).select(['_id', 'fName', 'lName', 'email', 'pass'])
            user.pass = undefined
            if (user) {
                res.status(200).json({ message: user })
            } else {
                res.status(403).json({ message: 'Invalid token' })
            }
        } catch (error) {
            res.status(400).json({ message: 'Something went wrong' })
        }
    }
})


module.exports = router