const projects = require('../Models/projectModel')
const users = require('../Models/userModel')
const todos = require('../Models/todoModel')
const jwt = require('jsonwebtoken')

exports.projectAdd = async (req, res) => {
    const { userId, project } = req.body
    try {
        const newProject = new projects({
            userId, project
        })
        await newProject.save()
        const userProjects = await projects.find({ userId: userId })
        res.status(200).json(userProjects)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.getProject = async (req, res) => {
    const { userId } = req.body
    try {
        const userProjects = await projects.find({ userId: userId })
        res.status(200).json(userProjects)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.addTodo = async (req, res) => {
    const { projectId, todo, createdTime, updateTime, status } = req.body
    try {
        const newTodo = new todos({
            projectId, todo, createdTime, updateTime, status
        })
        await newTodo.save()
        const task = await todos.find({ projectId: projectId })
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.getTodo = async (req, res) => {
    const { projectId } = req.body
    try {
        const task = await todos.find({ projectId: projectId })
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.updateTodo = async (req, res) => {
    const { todoId, todo, createdTime, updateTime, status } = req.body
    try {
        const updateData = ({
            todo: req.body.todo, updateTime: req.body.updateTime, status: req.body.status
        })
        const task = await todos.findByIdAndUpdate(req.body.todoId, updateData)
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const task = await todos.findByIdAndDelete({ _id: req.body.id })
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const task = await projects.findByIdAndDelete({ _id: req.body.id })
        const res = await todos.deleteMany({ projectId: req.body.id })
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.database = async (req, res) => {
    try {
        const task = await todos.find()
        const project = await projects.find()
        const user = await users.find()
        data = {
            task, project, user
        }
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

