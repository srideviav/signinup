const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { check } = require('express-validator');

router.post('/register', [check('name').notEmpty().withMessage("Name Cannot Be Empty"),
        check("username").notEmpty().withMessage("Username Cannot Be Empty"),
        check('password').notEmpty().withMessage("Password Cannot Be Empty"),
        check("email").notEmpty().withMessage("Email Cannot Be Empty"),
    ],
    userController.register);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;