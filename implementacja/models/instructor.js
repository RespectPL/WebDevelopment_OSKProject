const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema({
    //id uzytkownika
    user: {
        type: String
    },
    imie: {
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    telefon: {
        type: String,
        required: true
    }
})

const Instructor = mongoose.model('Instructor', InstructorSchema)

module.exports = Instructor