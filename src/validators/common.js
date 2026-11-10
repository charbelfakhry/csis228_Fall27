const {param} = require("express-validator");

// larger values would lose precision when converted to a JS number
const MAX_SAFE_INT = Number.MAX_SAFE_INTEGER;

const idRule = param("id")
    .isInt({min: 1, max: MAX_SAFE_INT}).withMessage("id must be a positive integer")
    .toInt();

module.exports = {
    MAX_SAFE_INT,
    idRule
}
