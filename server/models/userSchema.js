const mongoos = require('mongoose')

const userSchema = new mongoos.Schema(
    {
        fName: { type: String, required: true },
        lName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        pass: { type: String, required: true },
    }
)

const UserSchema = mongoose.model('User', userSchema);

module.exports = UserSchema;