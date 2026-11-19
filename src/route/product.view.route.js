const express = require("express");
const productViewController = require("../controller/productViewController");
const productValidator = require("../validators/productValidator");
const validate = require("../middleware/validate");
const validateForm = require("../middleware/validateForm");

const router = express.Router();

// "/new" must come before "/:id", otherwise "new" is treated as an id
router.get("/", productViewController.list);
router.get("/new", productViewController.newForm);
router.post("/",
    productValidator.create,
    validateForm("products/form", () => ({title: "New product", action: "/products"})),
    productViewController.create);

router.get("/:id", productValidator.getById, validate, productViewController.show);
router.get("/:id/edit", productValidator.getById, validate, productViewController.editForm);
router.post("/:id/edit",
    productValidator.update,
    validateForm("products/form", (req) => ({title: "Edit product", action: `/products/${req.params.id}/edit`})),
    productViewController.update);

// HTML forms only support GET and POST, so delete is a POST to its own URL
router.post("/:id/delete", productValidator.remove, validate, productViewController.remove);

module.exports = router;
