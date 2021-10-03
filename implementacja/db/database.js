const mongoose = require("mongoose")

const url = 'mongodb://localhost:27017/'
const name = 'osk'

mongoose.connect(url+name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})