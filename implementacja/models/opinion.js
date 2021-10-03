const mongoose = require('mongoose')

const OpinionSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    tresc: {
        type: String,
        required: true,
    }
})

const Opinion = mongoose.model('Opinion', OpinionSchema)

module.exports = Opinion