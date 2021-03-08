const Todo = require('../models/Todo');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/Todo');

exports.postTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, text } = req.body;
    
    try {
        const user = await User.findById({ _id: req.user.id });
        const newTodo = await Todo({title, text});
        user.todos.unshift(newTodo);
        await user.save();
        return res.json(newTodo);
    } catch (error) {
        return res.status(400).json({ message: 'Server Error' });
    }
}

exports.getAll = async (req, res, next) => {
        const user = await User.findById({ _id: req.user.id });
        const todos = user.todos;
        return res.json(todos);
}

exports.removeTodo = async (req, res, next) => {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    
    try {
        const user = await User.findById({ _id: userId });
        const updateTodos = user.todos.filter(todo => todo._id.toString() !== todoId.toString());
        user.todos = updateTodos;
        await user.save();
        return res.json(updateTodos);
    } catch (error) {
        return res.status(400).json({ message: 'Server Error' })
    }
}

exports.editTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const { title, text } = req.body;

    try {
        const user = await User.findById({ _id: userId });
        const updateTodo = user.todos.find(todo => todo._id.toString() === todoId.toString());
        const updateTodoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId.toString());  
        updateTodo.title = title;
        updateTodo.text = text;
        user.todos[updateTodoIndex] = updateTodo;
        await user.save();
        return res.json(updateTodo);
    } catch (error) {
        return res.status(400).json({ message: 'Server Error?' })
    }
}