const mongoose = require('mongoose')
require('dotenv').config()


const coonectDB = async () => {
    const host = process.env.DATA_BASE_URL
    try {
        await mongoose.connect(host)
        console.log('DB has been connected')
    } catch (error) {
        console.log('fail to coonect to DB')
    }
}


module.exports = coonectDB