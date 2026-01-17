require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const studentsRoute = require("./routes/studentsRoute");
const usersRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productsRoutes");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");

const app = express()
app.use(express.json());

app.use(helmet());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
});

app.use((req,res,next) => {
    const { sanitize } = mongoSanitize;
    if (req.body) sanitize(req.body);
    if (req.query) sanitize(req.query);
    if (req.params) sanitize(req.params);
    next()
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Kolxi howa hadak sir 3lah!'))
    .catch((err) => console.log(err));

app.use('/api/students', studentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productRoute);

module.exports = app