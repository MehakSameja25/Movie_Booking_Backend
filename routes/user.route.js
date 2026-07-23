const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const { checkPermission } = require("../middlewares/permission.middleware");

router.post("/", checkPermission("user.hh"), userController.createUser);

router.get("/", checkPermission("user.read"), userController.getAllUsers);

router.get("/:id", checkPermission("user.read"), userController.findUserById);

router.put("/:id", checkPermission("user.delete"), userController.updateUser);

router.delete(
  "/:id",
  checkPermission("user.create"),
  userController.deleteUser,
);

module.exports = router;
