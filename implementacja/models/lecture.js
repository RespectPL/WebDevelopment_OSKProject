const mongoose = require('mongoose')

const LectureSchema = new mongoose.Schema({
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
    temat: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    iloscgodzin: {
        type: Number, 
        required: true
    },
    completed: {
        type: Boolean
    },
    attend: {
        type: Boolean
    }
})

const Lecture = mongoose.model('Lecture', LectureSchema)

module.exports = Lecture