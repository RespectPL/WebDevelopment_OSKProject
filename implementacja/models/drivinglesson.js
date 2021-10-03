const mongoose = require('mongoose')

const DrivinglessonSchema = new mongoose.Schema({
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
    pojazd_id: {
        type: String,
        required: true
    },
    pojazd_info: {
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

const Drivinglesson = mongoose.model('Drivinglesson', DrivinglessonSchema)

module.exports = Drivinglesson