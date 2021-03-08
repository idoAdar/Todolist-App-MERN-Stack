const express = require('express');
const { body, validationResult } = require('express-validator');
const isAuth = require('../middelware/isAuth');
const todosController = require('../controller/todosController');

const route = express.Router();

// url: http://localhost:5000/api/todos/create_todo
// method: POST
// desc: Create Todo
// Private
route.post('/create_todo', [
    isAuth,
    body('title', 'Title filed is a must').notEmpty()
], todosController.postTodo);

// url: http://localhost:5000/api/todos/getAll
// method: GET
// desc: Fetch all todos
// Private
route.get('/getAll', isAuth, todosController.getAll);

// url: http://localhost:5000/api/todos/remove/:userId/:todoId
// method: DELETE
// desc: Remove Todo By Id
// Private
route.delete('/remove/:userId/:todoId', isAuth, todosController.removeTodo);

// url: http://localhost:5000/api/todos/edit/:userId/:todoId
// method: PUT
// desc: Edit Todo By Id
// Private
route.put('/edit/:userId/:todoId', [
    isAuth,
    body('title', 'Title field is a must').notEmpty()
], todosController.editTodo);

module.exports = route;