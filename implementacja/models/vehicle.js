const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true
    },
    typ: {
        type: String,
        required: true
    },
    nrrejestracyjny: {
        type: String,
        required: true,
        maxlength: 10
    }
})

const Vehicle = mongoose.model('Vehicle', VehicleSchema)

module.exports = Vehicle