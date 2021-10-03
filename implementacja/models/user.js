const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        require: true
    },
    haslo: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true
    },
    rola: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User