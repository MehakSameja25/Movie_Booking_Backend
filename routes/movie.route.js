const express = require("express");

const movieController = require("../controllers/movie.controller");

const { checkPermission } = require("../middlewares/permission.middleware"); const { authenticate } = require("../middlewares/auth.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("poster"),
  authenticate, checkPermission("movie.create"),
  movieController.createMovie,
);

router.get("/", movieController.getAllMovies);

router.get("/:id", movieController.getMovieById);

router.put(
  "/:id",
  upload.single("poster"),
  authenticate, checkPermission("movie.update"),
  movieController.updateMovie,
);

router.put(
  "/:id/status",
  authenticate, checkPermission("movie.status"),
  movieController.updateMovieStatus,
);

module.exports = router;
