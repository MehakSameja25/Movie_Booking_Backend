const express = require("express");
const router = express.Router();

const showController = require("../controllers/show.controller");

const { checkPermission } = require("../middlewares/permission.middleware"); const { authenticate } = require("../middlewares/auth.middleware");

router.post("/", authenticate, checkPermission("show.create"), showController.createShow);

router.get("/", showController.getShows);

router.get("/:id", showController.getShowById);

router.get("/:id/seats", showController.getShowSeats);

router.put("/:id", authenticate, checkPermission("show.update"), showController.updateShow);

router.put(
  "/:id/status",
  authenticate, checkPermission("show.status"),
  showController.updateShowStatus,
);

module.exports = router;
