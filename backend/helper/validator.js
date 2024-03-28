const { validationResult } = require('express-validator');

const validate = (req => {
    const errors = validationResult(req);

    console.log(errors, "-------errors-------")
})
exports.module = validate