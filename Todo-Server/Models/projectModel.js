const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    }
})

const projects = mongoose.model('projects', projectSchema)
module.exports = projects