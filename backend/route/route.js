const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { check } = require('express-validator');
const auth = require('../helper/auth');


router.post('/register', [check('name').notEmpty().withMessage("Name Cannot Be Empty"),
        check("username").notEmpty().withMessage("Username Cannot Be Empty"),
        check('password').notEmpty().withMessage("Password Cannot Be Empty")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
        .withMessage("Password Should contain atleast 1 uppercase,1 lowercase, 1 integer,1 special character")
        .trim(),
        check("email").notEmpty().withMessage("Email Cannot Be Empty").isEmail().withMessage("Invalid Email"),
    ],
    userController.register);


router.post('/login', [check('username').notEmpty().withMessage("Username or Email Cannot Be Empty"),
        //check('email').notEmpty().withMessage("Email Cannot Be Empty"),
        check('password').notEmpty().withMessage("Password Cannot Be Empty")
    ],
    userController.login);


router.post('/forgotPassword', [check('email').notEmpty().withMessage("Email Cannot Be Empty")],
    userController.forgotPassword);


router.post('/resetPassword', [check('password').notEmpty().withMessage("Password Cannot Be Empty")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
    .withMessage("Password Should contain atleast 1 uppercase,1 lowercase, 1 integer,1 special character")
    .trim(),
], userController.resetPassword);


router.post('/checkOTP', [check('resetToken').notEmpty().withMessage("OTP cannot be empty")],
    userController.checkOTP);


router.get('/dashboard', auth, userController.dashboard);


module.exports = router;