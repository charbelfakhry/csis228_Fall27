const {param} = require("express-validator");

const idRule = param("id")
    .isInt({min: 1}).withMessage("id must be a positive integer")
    .toInt();

module.exports = {
    idRule
}
