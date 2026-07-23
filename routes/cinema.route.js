const express = require("express");

const cinemaController = require("../controllers/cinema.controller");
const { checkPermission } = require("../middlewares/permission.middleware");

const router = express.Router();

router.post(
  "/",
  checkPermission("cinema.create"),
  cinemaController.createCinema,
);

router.get("/", checkPermission("cinema.read"), cinemaController.getAllCinemas);

router.get(
  "/:id",
  checkPermission("cinema.read"),
  cinemaController.getCinemaById,
);

router.put(
  "/:id",
  checkPermission("cinema.update"),
  cinemaController.updateCinema,
);

router.put(
  "/:id/status",
  checkPermission("cinema.status"),
  cinemaController.updateCinemaStatus,
);

module.exports = router;
