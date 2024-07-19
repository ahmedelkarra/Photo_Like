const PhotoSchema = require('../models/photoSchema')


const getUserPhotos = async (req, res) => {
    const { _id } = req.userInfo
    console.log(_id);
    try {
        const userPhotos = await PhotoSchema.find({ author: _id })
        return res.status(200).json({ message: userPhotos })
    } catch (error) {
        return res.status(404).json({ message: 'User not found' })
    }
}

module.exports = { getUserPhotos };