const { tokenSign, tokenVerify } = require('../helper/token')
const UserSchema = require('../models/userSchema')
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.post('/login', async (req, res) => {
    const { email, pass } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailStatus = emailRegex.test(email);
    if (emailStatus && pass) {
        try {
            const user = await UserSchema.findOne({ email: email }).select(['_id', 'fName', 'lName', 'email', 'pass'])
            if (user) {
                const checkPass = bcrypt.compareSync(pass, user.pass)
                user.pass = undefined
                const token = tokenSign({ _id: user._id, fName: user.fName, lName: user.lName, email: user.email })
                const data = tokenVerify(token)
                if (checkPass) {
                    return res.status(200).json({ message: `Welcome ${user.fName} ${user.lName}`, token: token, data: data })
                } else {
                    return res.status(404).json({ message: 'Wrong email or password' })
                }
            } else {
                return res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            return res.status(400).json({ message: 'Something went wrong' })
        }
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
})


module.exports = router