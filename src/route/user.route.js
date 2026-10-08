
const express = require("express");
const userController = require("../controller/userController");
const userValidator = require("../validators/userValidator");
const validate = require("../middleware/validate");
const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userValidator.getUser, validate, userController.getUser);
router.post("/", userValidator.createUser, validate, userController.createUser);
router.put("/:id", userValidator.updateUser, validate, userController.updateUser);
router.delete("/:id", userValidator.deleteUser, validate, userController.deleteUser);


module.exports = router;
