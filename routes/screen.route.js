const express = require("express");

const screenController = require("../controllers/screen.controller");
const { checkPermission } = require("../middlewares/permission.middleware");

const router = express.Router();

router.post(
  "/",
  checkPermission("screen.create"),
  screenController.createScreen,
);

router.get("/", checkPermission("screen.read"), screenController.getAllScreens);

router.get(
  "/:id",
  checkPermission("screen.read"),
  screenController.getScreenById,
);

router.put(
  "/:id",
  checkPermission("screen.update"),
  screenController.updateScreen,
);

router.put(
  "/:id/status",
  checkPermission("screen.status"),
  screenController.updateScreenStatus,
);

module.exports = router;
