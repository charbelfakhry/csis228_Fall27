const express = require("express");
const userViewController = require("../controller/userViewController");
const userValidator = require("../validators/userValidator");
const validate = require("../middleware/validate");
const validateForm = require("../middleware/validateForm");

const router = express.Router();

// "/new" must come before "/:id", otherwise "new" is treated as an id
router.get("/", userViewController.list);
router.get("/new", userViewController.newForm);
router.post("/",
    userValidator.create,
    validateForm("users/form", () => ({title: "New user", action: "/users"})),
    userViewController.create);

router.get("/:id", userValidator.getById, validate, userViewController.show);
router.get("/:id/edit", userValidator.getById, validate, userViewController.editForm);
router.post("/:id/edit",
    userValidator.update,
    validateForm("users/form", (req) => ({title: "Edit user", action: `/users/${req.params.id}/edit`})),
    userViewController.update);

// HTML forms only support GET and POST, so delete is a POST to its own URL
router.post("/:id/delete", userValidator.remove, validate, userViewController.remove);

module.exports = router;
