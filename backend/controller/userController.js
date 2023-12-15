const User = require('../model/userModel');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const sendEmail = require('../helper/mail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


exports.register = (req, res) => {
    const validation = validationResult(req);
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
                return res.json({
                    status: false,
                    errors: err.msg
                })
            })
    }
};
exports.login = (req, res) => {
    const validation = validationResult(req);
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
        User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.username }]
        }).then(data => {
            if (data) {
                bcrypt.compare(req.body.password, data.password, function(err, result) {
                    if (result && result == true) {
                        const token = jwt.sign({
                            name: data.name,
                            username: data.username,
                            email: data.email
                        }, process.env.SECRET, { expiresIn: '1h' })
                        return res.json({
                            status: true,
                            message: "User Logged In Successfully",
                            data: data,
                            token: token
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "Incorrect Password"
                        })
                    }
                });

            } else {
                return res.json({
                    status: false,
                    message: "User Not Found",
                })
            }
        }).catch(err => {
            return res.json({
                status: false,
                errors: err.msg
            })
        })
    }
};
exports.checkOTP = (req, res) => {
    const validation = validationResult(req);
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
        User.findOne({ resetToken: req.body.resetToken })
            .then(data => {
                if (data) {
                    return res.json({
                        status: true,
                        message: "OTP Verified",
                    })
                } else {
                    return res.json({
                        status: false,
                        errors: "Invalid OTP"
                    })
                }
            }).catch(err => {
                return res.json({
                    status: false,
                    message: "Something Went Wrong",
                    errors: err.msg
                })
            })
    }
};
exports.forgotPassword = (req, res) => {
    const validation = validationResult(req);
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
            .then(data => {
                if (data) {
                    const generateToken = crypto.randomBytes(Math.ceil(10 / 2))
                        .toString('hex')
                        .slice(0, 10);
                    console.log(generateToken)
                    data.resetToken = generateToken;
                    data.tokenExpires = Date.now() + 1800000;
                    data.save()
                    return res.json({
                        status: true,
                        message: "Email sent to registered mail ID",
                        //data: sendEmail()
                    })
                } else {
                    return res.json({
                        status: false,
                        errors: "Email not found"
                    })
                }
            }).catch(err => {
                return res.json({
                    status: false,
                    message: "Something Went Wrong",
                    errors: err.msg
                })
            })
    }
};
exports.resetPassword = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (data) {
                data.password = req.body.password;
                data.save();
                return res.json({
                    status: true,
                    message: "Password have been changed successfully"
                })
            } else {
                return res.json({
                    status: false,
                    errors: "Password is not updated,try again"
                })
            }
        })
        .catch(err => {
            return res.json({
                status: false,
                errors: err.msg
            })
        })
};
exports.dashboard = (req, res) => {
    User.findOne({ _id: req.user._id })
        .then(data => {
            if (data) {
                return res.json({
                    status: true,
                    message: "user datail",
                    data: data
                })
            } else {
                return res.json({
                    status: false,
                    errors: "User not found"
                })
            }
        })
        .catch(err => {
            return res.json({
                status: false,
                errors: err.msg
            })
        })
};