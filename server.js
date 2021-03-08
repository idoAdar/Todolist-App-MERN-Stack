const express = require('express');
const mongoose = require('mongoose');
const URI = 'mongodb+srv://ido_adar:239738416@cluster0.b5681.mongodb.net';
const authRoutes = require('./routes/auth');
const todosRoutes = require('./routes/todos');

const app = express();

app.use(express.json({ extended: false }));

// Main Routes:
app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(PORT);
        console.log(`Server started on port ${PORT}`);
    })
    .catch(err => console.log(err));