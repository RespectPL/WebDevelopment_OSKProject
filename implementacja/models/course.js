const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    oznaczenie: {
        type: String,
        required: true,
        maxlength: 4
    },
    kategoria: {
        type: String,
        required: true
    }
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course