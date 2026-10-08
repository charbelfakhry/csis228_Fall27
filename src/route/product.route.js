
const express = require("express");
const productController = require("../controller/productController");
const productValidator = require("../validators/productValidator");
const validate = require("../middleware/validate");
const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productValidator.getById, validate, productController.getById);
router.post("/", productValidator.create, validate, productController.create);
router.put("/:id", productValidator.update, validate, productController.update);
router.delete("/:id", productValidator.remove, validate, productController.remove);


module.exports = router;
