const express = require("express");

const permissionController = require("../controllers/permission.controller");

const { checkPermission } = require("../middlewares/permission.middleware");

const router = express.Router();

router.post(
  "/",
  checkPermission("permission.create"),
  permissionController.createPermission,
);

router.get(
  "/",
  checkPermission("permission.read"),
  permissionController.getAllPermissions,
);

router.get(
  "/:id",
  checkPermission("permission.read"),
  permissionController.getPermissionById,
);

router.put(
  "/:id",
  checkPermission("permission.update"),
  permissionController.updatePermission,
);

router.delete(
  "/:id",
  checkPermission("permission.delete"),
  permissionController.deletePermission,
);

module.exports = router;
