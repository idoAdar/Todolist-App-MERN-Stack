const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "secret_code";
const User = require('../models/User');

exports.postNewUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
    
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({name, email, password: hashPassword});
        await newUser.save();
        const payload = { id: newUser._id };
        jwt.sign(payload, jwtSecret, (error, token) => {
            return res.json({ newUser });
        })
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User Not Found' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Password' });
    }

    const payload = { id: user._id };
    jwt.sign(payload, jwtSecret, (error, token) => {
        return res.json({token, user});
    })
}