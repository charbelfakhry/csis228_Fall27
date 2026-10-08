const {body, param} = require("express-validator");

const idRule = param("id")
    .isInt({min: 1}).withMessage("id must be a positive integer")
    .toInt();

const nameRule = (field) =>
    body(field)
        .exists({values: "falsy"}).withMessage(`${field} is required`)
        .isString().withMessage(`${field} must be a string`)
        .trim()
        .isLength({min: 2, max: 50}).withMessage(`${field} must be between 2 and 50 characters`);

const userBodyRules = [
    nameRule("firstName"),
    nameRule("lastName"),
    body("dob")
        .exists({values: "falsy"}).withMessage("dob is required")
        .isISO8601({strict: true}).withMessage("dob must be a valid date (YYYY-MM-DD)")
        .custom((value) => new Date(value) < new Date()).withMessage("dob must be in the past")
];

const getUser = [idRule];
const createUser = [...userBodyRules];
const updateUser = [idRule, ...userBodyRules];
const deleteUser = [idRule];

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}
