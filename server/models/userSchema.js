const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fName: { type: String, required: true, maxlength: 20 },
        lName: { type: String, required: true, maxlength: 20 },
        email: { type: String, required: true, unique: true, maxlength: 30 },
        pass: { type: String, required: true },
    }, { timestamps: true }
)

const UserSchema = mongoose.model('User', userSchema);

module.exports = UserSchema;