const { tokenSign, tokenVerify } = require('../middleware/token')
const UserSchema = require('../models/userSchema')
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.post('/login', async (req, res) => {
    const { email, pass } = req.body
    if (email && pass) {
        try {
            const user = await UserSchema.findOne({ email: email }).select(['_id', 'fName', 'lName', 'email', 'pass'])
            if (user) {
                const checkPass = bcrypt.compareSync(pass, user.pass)
                user.pass = undefined
                const token = tokenSign({ _id: user._id, fName: user.fName, lName: user.lName, email: user.email })
                const data = tokenVerify(token)
                if (checkPass) {
                    res.status(200).json({ message: `Welcome ${user.fName} ${user.lName}`, token: token, data: data })
                } else {
                    res.status(404).json({ message: 'Wrong email or password' })
                }
            } else {
                res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            res.status(400).json({ message: 'Something went wrong' })
        }
    } else {
        res.status(400).json({ message: 'Please check your inputs' })
    }
})


module.exports = router