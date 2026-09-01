const express = require("express");

const cinemaController = require("../controllers/cinema.controller");
const { checkPermission } = require("../middlewares/permission.middleware"); const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authenticate, checkPermission("cinema.create"),
  cinemaController.createCinema,
);

router.get("/", cinemaController.getAllCinemas);

router.get(
  "/:id",
  cinemaController.getCinemaById,
);

router.put(
  "/:id",
  authenticate, checkPermission("cinema.update"),
  cinemaController.updateCinema,
);

router.put(
  "/:id/status",
  authenticate, checkPermission("cinema.status"),
  cinemaController.updateCinemaStatus,
);

module.exports = router;
