const express = require("express");
const router = express.Router();

const showController = require("../controllers/show.controller");

const { checkPermission } = require("../middlewares/permission.middleware");

router.post("/", checkPermission("show.create"), showController.createShow);

router.get("/", checkPermission("show.read"), showController.getShows);

router.get("/:id", checkPermission("show.read"), showController.getShowById);

router.put("/:id", checkPermission("show.update"), showController.updateShow);

router.put(
  "/:id/status",
  checkPermission("show.status"),
  showController.updateShowStatus,
);

module.exports = router;
