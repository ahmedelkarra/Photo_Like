const jwt = require('jsonwebtoken')
require('dotenv').config()


const tokenSign = (payload) => {
    try {
        const secret = process.env.SECRET_TOKEN
        const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' })
        return token
    } catch (error) {
        return false
    }
}

const tokenVerify = (token) => {
    try {
        const secret = process.env.SECRET_TOKEN
        const data = jwt.verify(token, secret)
        return data
    } catch (error) {
        return false
    }
}

module.exports = { tokenVerify, tokenSign }