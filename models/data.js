const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    username: String,
    email: String,
    message: String
})

module.exports = mongoose.model('dataForm', dataSchema);