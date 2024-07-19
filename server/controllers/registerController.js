const { tokenSign, tokenVerify } = require('../helper/token')
const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {
    const { fName, lName, email, pass, confirmPass } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailStatus = emailRegex.test(email);
    if (fName && lName && emailStatus && pass && pass === confirmPass) {
        try {
            const hashPass = bcrypt.hashSync(pass, 12)
            const user = await UserSchema.create({ fName: fName.trim().toLowerCase(), lName: lName.trim().toLowerCase(), email: email.trim().toLowerCase(), pass: hashPass })
            const token = tokenSign({ _id: user._id, fName: user.fName, lName: user.lName, email: user.email })
            const data = tokenVerify(token)
            if (user) {
                return res.status(201).json({ message: 'User has been created', token: token, data: data })
            } else {
                return res.status(403).json({ message: 'Email is already used' })
            }
        } catch (error) {
            const messageError = error?.errorResponse?.errmsg
            if (messageError?.includes('duplicate')) {
                return res.status(403).json({ message: 'Email is already used' })
            } else {
                return res.status(403).json({ message: 'Please check your inputs length' })
            }
        }
    } else if (pass !== confirmPass) {
        return res.status(400).json({ message: 'Your password not match' })
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
}

module.exports = { registerUser };