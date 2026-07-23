const express = require("express");

const roleController = require("../controllers/role.controller");

const { checkPermission } = require("../middlewares/permission.middleware");

const router = express.Router();

router.post("/", checkPermission("role.create"), roleController.createRole);
router.get("/", checkPermission("role.read"), roleController.getAllRoles);
router.get("/:id", checkPermission("role.read"), roleController.getRoleById);
router.put("/:id", checkPermission("role.update"), roleController.updateRole);
router.delete(
  "/:id",
  checkPermission("role.delete"),
  roleController.deleteRole,
);
router.post(
  "/:roleId/permissions",
  checkPermission("role.assignPermission"),
  roleController.assignPermissions,
);

module.exports = router;
