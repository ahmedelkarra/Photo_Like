const PhotoSchema = require('../models/photoSchema')


const getAllPhotos = async (req, res) => {
    try {
        const userPhotos = await PhotoSchema.find({})
        return res.status(200).json({ message: userPhotos })
    } catch (error) {
        return res.status(404).json({ message: "don't have photos" })
    }
}

module.exports = { getAllPhotos };