require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const studentsRoute = require("./routes/studentsRoute");
const usersRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productsRoutes");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Kolxi howa hadak sir 3lah!'))
    .catch((err) => console.log(err));

const app = express()
app.use(express.json());

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

app.use('/api/students', studentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productRoute);

module.exports = app