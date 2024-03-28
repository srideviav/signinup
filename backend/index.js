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

let DB;
if (process.env.NODE_ENV === 'dev') {
    DB = mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DEV}`)
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
    DB = mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_TEST}`)
        .then(connected => {
            if (connected) {
                console.log("Test DB connected successfully")
            } else {
                console.log("Test DB disconnected successfully:")
            }
        }).catch(err => {
            console.log("catch the error:", err)
        })
}

app.listen(process.env.PORT, () => {
    console.log(`Running on port http://localhost:${process.env.PORT}`)
})

module.exports = app;