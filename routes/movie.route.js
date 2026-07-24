const express = require("express");

const movieController = require("../controllers/movie.controller");

const { checkPermission } = require("../middlewares/permission.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("poster"),
  checkPermission("movie.create"),
  movieController.createMovie,
);

router.get("/", checkPermission("movie.read"), movieController.getAllMovies);

router.get("/:id", checkPermission("movie.read"), movieController.getMovieById);

router.put(
  "/:id",
  upload.single("poster"),
  checkPermission("movie.update"),
  movieController.updateMovie,
);

router.put(
  "/:id/status",
  checkPermission("movie.status"),
  movieController.updateMovieStatus,
);

module.exports = router;
