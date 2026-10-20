const express = require("express");
const userController = require("../controller/userController");
const userValidator = require("../validators/userValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userValidator.getById, validate, userController.getById);
router.post("/", userValidator.create, validate, userController.create);
router.put("/:id", userValidator.update, validate, userController.update);
router.delete("/:id", userValidator.remove, validate, userController.remove);

module.exports = router;
