const User = require('../model/userModel');
const { validationResult } = require('express-validator')


exports.register = (req, res) => {
    //console.log(req.body, "-----------")
    const validation = validationResult(req);
    // console.log(validation.errors.length > 0, "----gggggggggg----")
    if (validation.errors.length > 0) {
        let error = [];
        validation.errors.map(response => {
            error.push(response.msg)
        })
        return res.json({
            status: false,
            message: "Validation Error",
            errors: error
        })
    } else {
        User.findOne({ email: req.body.email })
            .then((isEmailExists) => {
                if (isEmailExists) {
                    return res.json({
                        status: false,
                        errors: "Email is Already Exists"
                    })
                } else {
                    User.findOne({ username: req.body.username })
                        .then(isUsernameExists => {
                            if (isUsernameExists) {
                                return res.json({
                                    status: false,
                                    errors: "Username is Already Exists"
                                })
                            } else {
                                User.create({
                                    name: req.body.name,
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password
                                }).then(data => {
                                    if (data) {
                                        return res.json({
                                            status: true,
                                            message: "User Registered Successfully"
                                        })
                                    } else {
                                        return res.json({
                                            status: false,
                                            errors: "Failed to Register the User"
                                        })
                                    }
                                }).catch(err => {
                                    throw err;
                                })
                            }
                        }).catch(err => {
                            throw err;
                        })
                }
            }).catch(err => {
                console.log("SOmething went wrong:", err)
                return res.json({
                    status: false,
                    errors: err.msg
                })
            })
    }
};
exports.login = (req, res) => {};
exports.forgotPassword = (req, res) => {};
exports.resetPassword = (req, res) => {};