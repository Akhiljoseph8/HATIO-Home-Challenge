const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    createdTime: {
        type: String,
        required: true
    },
    updateTime: {
        type: String,

    },
    status: {
        type: String,
        required: true
    },
})

const todos = mongoose.model('todos', todoSchema)
module.exports = todos