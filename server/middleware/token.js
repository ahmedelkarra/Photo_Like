const jwt = require('jsonwebtoken')
require('dotenv').config()


const tokenSign = (payload) => {
    const secret = process.env.SECRET_TOKEN
    const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' })
    return token
}

const tokenVerify = (token) => {
    const secret = process.env.SECRET_TOKEN
    const data = jwt.verify(token, secret)
    return data
}

module.exports = { tokenVerify, tokenSign }