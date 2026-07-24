const { checkPermission } = require("../middlewares/permission.middleware");

const express = require("express");

const seatController = require("../controllers/seat.controller");

const router = express.Router();

router.get(
  "/screen/:screenId",
  checkPermission("seat.read"),
  seatController.getSeatsByScreenId,
);

router.get("/:id", checkPermission("seat.read"), seatController.getSeatById);

router.put(
  "/:id/status",
  checkPermission("seat.status"),
  seatController.updateSeatStatus,
);

module.exports = router;
