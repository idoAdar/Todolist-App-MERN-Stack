const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controller/authController');

const route = express.Router();

// url: http://localhost:5000/api/auth
// method: POST
// desc: Create new user
// Public
route.post('/', [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password must be at least 9 characters').isLength({ min: 9 })
] ,authController.postNewUser);

// url: http://localhost:5000/api/auth/login
// method: POST
// desc: Login
// Public
route.post('/login', [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 9 })
], authController.postLogin);

module.exports = route;