const express = require("express");

const screenController = require("../controllers/screen.controller");
const { checkPermission } = require("../middlewares/permission.middleware"); const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authenticate, checkPermission("screen.create"),
  screenController.createScreen,
);

router.get("/", screenController.getAllScreens);

router.get(
  "/:id",
  
  screenController.getScreenById,
);

router.put(
  "/:id",
  authenticate, checkPermission("screen.update"),
  screenController.updateScreen,
);

router.put(
  "/:id/status",
  authenticate, checkPermission("screen.status"),
  screenController.updateScreenStatus,
);

module.exports = router;
