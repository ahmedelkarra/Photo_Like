const { tokenVerify } = require('../middleware/token')
const UserSchema = require('../models/userSchema')
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.get('/me', async (req, res) => {
    const token = req.cookies.token
    const data = tokenVerify(token)
    console.log(data);
    if (data) {
        try {
            const user = await UserSchema.findById(data._id).select(['_id', 'fName', 'lName', 'email', 'pass'])
            user.pass = undefined
            if (user) {
                res.status(200).json({ message: user })
            } else {
                res.status(403).json({ message: 'Invalid token' })
            }
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' })
        }
    }
})

router.put('/me', async (req, res) => {
    const { fName, lName, email, pass, newPass, confirmNewPass } = req.body
    const token = req.cookies.token
    const data = tokenVerify(token).user
    if (fName && lName && email && pass) {
        try {
            const user = await UserSchema.findById(data._id).select(['_id', 'fName', 'lName', 'email', 'pass'])
            if (user) {
                const checkPass = bcrypt.compareSync(pass, user.pass)
                user.pass = undefined
                if (checkPass) {
                    if (fName && lName && email && pass && !newPass || !confirmNewPass) {
                        await user.updateOne({ fName, lName, email })
                        res.status(200).json({ message: 'User has been updated' })
                    } else if (fName && lName && email && pass && newPass && newPass === confirmNewPass) {
                        const hashPass = bcrypt.hashSync(newPass, 12)
                        await user.updateOne({ fName, lName, email, pass: hashPass })
                        res.status(200).json({ message: 'User has been updated' })
                    } else {
                        res.status(400).json({ message: 'Your new password not match' })
                    }
                } else {
                    res.status(404).json({ message: 'Wrong email or password' })
                }
            } else {
                res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            res.status(404).json({ message: 'Invalid token' })
        }
    } else {
        res.status(400).json({ message: 'Please check your inputs' })
    }
})

router.delete('/me', async (req, res) => {
    const { email, pass } = req.body
    if (email && pass) {
        try {
            const user = await UserSchema.findOne({ email: email }).select(['_id', 'fName', 'lName', 'email', 'pass'])
            if (user) {
                const checkPass = bcrypt.compareSync(pass, user.pass)
                user.pass = undefined
                if (checkPass) {
                    await user.deleteOne()
                    res.status(200).json({ message: 'User has been deleted' })
                } else {
                    res.status(404).json({ message: 'Wrong email or password' })
                }
            } else {
                res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            res.status(404).json({ message: 'Invalid token' })
        }
    } else {
        res.status(400).json({ message: 'Please check your inputs' })
    }
})


module.exports = router