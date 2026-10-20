const {body} = require("express-validator");
const {idRule} = require("./common");

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

const getById = [idRule];
const create = [...userBodyRules];
const update = [idRule, ...userBodyRules];
const remove = [idRule];

module.exports = {
    getById,
    create,
    update,
    remove
}
