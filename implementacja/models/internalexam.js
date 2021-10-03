const mongoose = require('mongoose')

const InternalexamSchema = new mongoose.Schema({
    instruktor_login: {
        type: String,
        required: true
    },
    instruktor_imie: {
        type: String,
        required: true
    },
    instruktor_nazwisko: {
        type: String,
        required: true
    },
    kursant_login: {
        type: String,
        required: true
    },
    kursant_imie: {
        type: String,
        required: true
    },
    kursant_nazwisko: {
        type: String,
        required: true
    },
    kurs_id: {
        type: String,
        required: true
    },
    kurs_info: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    pass: {
        type: Boolean
    },
    completed: {
        type: Boolean
    }
})

const Internalexam = mongoose.model('Internalexam', InternalexamSchema)

module.exports = Internalexam