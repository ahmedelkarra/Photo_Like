const UserSchema = require('../models/userSchema')
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.post('/register', async (req, res) => {
    const { fName, lName, email, pass, confirmPass } = req.body
    if (fName && lName && email && pass && pass === confirmPass) {
        try {
            const hashPass = bcrypt.hashSync(pass, 12)
            const user = await UserSchema.create({ fName: fName.trim().toLowerCase(), lName: lName.trim().toLowerCase(), email: email.trim().toLowerCase(), pass: hashPass })
            if (user) {
                res.status(201).json({ message: 'User has been created' })
            } else {
                res.status(403).json({ message: 'Email is already used' })
            }
        } catch (error) {
            res.status(403).json({ message: 'Email is already used' })
        }
    } else if (pass !== confirmPass) {
        res.status(400).json({ message: 'Your password not match' })
    } else {
        res.status(400).json({ message: 'Please check your inputs' })
    }
})

module.exports = router