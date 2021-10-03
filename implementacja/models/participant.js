const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
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
    pesel: {
        type: String,
        required: true,
        maxlength: 11
    },
    telefon: {
        type: String,
        required: true
    },
    pkk: {
        type: String,
        required: true,
        maxlength: 20
    }
})

const Participant = mongoose.model('Participant', ParticipantSchema)

module.exports = Participant