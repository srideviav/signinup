const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var userRoutes = require('./route/route');
app.use(cors())
app.use("/user", userRoutes)

const db = mongoose.connect("mongodb://localhost:27017/SignInUp");
db.then(connected => {
    if (connected) {
        console.log("successfully connected to database")
    } else {
        console.log("database disconnected")
    }
})

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`)
})