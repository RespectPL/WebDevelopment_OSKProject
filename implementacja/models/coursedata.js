const mongoose = require('mongoose')

const CoursedataSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    imie: {
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    kurs: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

const Coursedata = mongoose.model('Coursedata', CoursedataSchema)

module.exports = Coursedata