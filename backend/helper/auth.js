const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.json({
            status: false,
            errors: "Token is required"
        });
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.json({
                status: false,
                errors: err.message
            })
        }
        req.user = user;
        next();
    });
};
module.exports = auth;

// const token = jwt.sign(User.findOne({
//         $or: [{ email: req.body.username }, { username: req.body.username }],
//         password: req.body.password
//     })
//     .then(user => {
//         if (user) {
//             return res.json({
//                 status: true,
//                 token: user
//             })
//         }
//         if (!user) {
//             return res.json({
//                 status: false,
//                 message: "User Not Found"
//             })
//         }
//     })
//     .catch(err => {
//         console.log(err, "---------------------------------------------------------------")
//         return res.json({
//             status: false,
//             errors: err
//         })
//     }), process.env.SECRET, { expiresIn: '1h' });
// console.log('JWT:', token);
// // Verify and decode the JWT
// jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//         console.error('JWT verification failed:', err.message);
//     } else {
//         console.log('Decoded JWT:', decoded);
//     }
// });