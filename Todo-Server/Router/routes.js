const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')


router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.post('/project', projectController.projectAdd)
router.post('/getproject', projectController.getProject)
router.post('/todo', projectController.addTodo)
router.post('/gettodo', projectController.getTodo)
router.post('/update-todo', projectController.updateTodo)
router.post('/delete-todo', projectController.deleteTodo)
router.post('/delete-project', projectController.deleteProject)
router.get('/database',projectController.database)
module.exports = router