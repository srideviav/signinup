const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const userRoutes = require('./route/route');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()
app.use(cors())
app.use("/user", userRoutes)

if (process.env.NODE_ENV === 'dev') {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DEV}`)
        .then(connected => {
            if (connected) {
                console.log("Development DB connected successfully")
            } else {
                console.log("Development DB disconnected")
            }
        })
        .catch(err => {
            console.log("Something Went Wrong:", err)
        })
} else {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_TEST}`)
        .then(connected => {
            if (connected) {
                console.log("Test DB connected successfully")
            } else {
                console.log("Test DB disconnected successfully")
            }
        })
        .catch(err => {
            console.log("Something went wrong:", err)
        })
}

// app.listen(port, () => {
//     console.log(`Running on port http://localhost:${port}`)
// })

module.exports = app;