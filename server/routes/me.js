const { tokenVerify } = require('../helper/token')
const UserSchema = require('../models/userSchema')
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.get('/me', async (req, res) => {
    res.header("Access-Control-Allow-Origin", 'https://photo-like-one.vercel.app');
    const token = req.headers.authorization
    const data = tokenVerify(token)
    if (data) {
        try {
            const user = await UserSchema.findById(data._id).select(['_id', 'fName', 'lName', 'email', 'pass'])
            user.pass = undefined
            if (user) {
                return res.status(200).json({ message: user })
            } else {
                return res.status(403).json({ message: 'Invalid token' })
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid token' })
        }
    }
})

router.put('/me', async (req, res) => {
    const { fName, lName, email, pass, newPass, confirmNewPass } = req.body
    const token = req.headers.authorization
    const data = tokenVerify(token)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailStatus = emailRegex.test(email);
    if (fName && fName.length <= 20 && lName && lName.length <= 20 && emailStatus && pass) {
        try {
            const user = await UserSchema.findById(data._id).select(['_id', 'fName', 'lName', 'email', 'pass'])
            if (user) {
                const checkPass = bcrypt.compareSync(pass, user.pass)
                user.pass = undefined
                if (checkPass) {
                    if (fName && lName && email && pass && !newPass || !confirmNewPass) {
                        await user.updateOne({ fName, lName, email })
                        return res.status(200).json({ message: 'User has been updated' })
                    } else if (fName && lName && email && pass && newPass && newPass === confirmNewPass) {
                        const hashPass = bcrypt.hashSync(newPass, 12)
                        await user.updateOne({ fName, lName, email, pass: hashPass })
                        return res.status(200).json({ message: 'User has been updated' })
                    } else {
                        return res.status(400).json({ message: 'Your new password not match' })
                    }
                } else {
                    return res.status(404).json({ message: 'Wrong email or password' })
                }
            } else {
                return res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            if (error?.errorResponse?.errmsg?.includes('duplicate')) {
                return res.status(403).json({ message: 'Email is already used' })
            } else {
                return res.status(404).json({ message: 'Invalid token' })
            }
        }
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
})

router.delete('/me', async (req, res) => {
    res.header("Access-Control-Allow-Origin", 'https://photo-like-one.vercel.app');
    const { email, pass } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailStatus = emailRegex.test(email);
    if (emailStatus && pass) {
        try {
            const user = await UserSchema.findOne({ email: email }).select(['_id', 'fName', 'lName', 'email', 'pass'])
            if (user) {
                const checkPass = bcrypt.compareSync(pass, user.pass)
                user.pass = undefined
                if (checkPass) {
                    await user.deleteOne()
                    return res.status(200).json({ message: 'User has been deleted' })
                } else {
                    return res.status(404).json({ message: 'Wrong email or password' })
                }
            } else {
                return res.status(404).json({ message: 'Wrong email or password' })
            }
        } catch (error) {
            return res.status(404).json({ message: 'Invalid token' })
        }
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
})


module.exports = router