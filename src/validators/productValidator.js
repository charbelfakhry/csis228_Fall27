const {body, param} = require("express-validator");

const idRule = param("id")
    .isInt({min: 1}).withMessage("id must be a positive integer")
    .toInt();

const productBodyRules = [
    body("name")
        .exists({values: "falsy"}).withMessage("name is required")
        .isString().withMessage("name must be a string")
        .trim()
        .isLength({min: 2, max: 100}).withMessage("name must be between 2 and 100 characters"),
    body("description")
        .exists({values: "falsy"}).withMessage("description is required")
        .isString().withMessage("description must be a string")
        .trim()
        .isLength({max: 500}).withMessage("description must be at most 500 characters"),
    body("quantity")
        .exists({values: "null"}).withMessage("quantity is required")
        .isInt({min: 0}).withMessage("quantity must be a non-negative integer")
        .toInt()
];

const getById = [idRule];
const create = [...productBodyRules];
const update = [idRule, ...productBodyRules];
const remove = [idRule];

module.exports = {
    getById,
    create,
    update,
    remove
}
