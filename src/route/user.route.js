
const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/", userController.deleteUser);


module.exports = router;