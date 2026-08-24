const movieService = require("../services/movie.service");

const { uploadFile, deleteFile } = require("../utils/upload.utils");
const createMovie = async (req, res) => {
  try {
    let poster = null;
    let posterFileId = null;

    if (req.file) {
      const uploadedImage = await uploadFile(req.file.buffer);

      poster = uploadedImage.url;
      posterFileId = uploadedImage.fileId;
    }

    const movie = await movieService.createMovie({
      ...req.body,
      duration: Number(req.body.duration),
      language: JSON.parse(req.body.language),
      poster,
      posterFileId,
    });

    return res.status(201).json({
      success: true,
      message: "Movie created successfully.",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const movies = await movieService.getAllMovies(page, limit);

    return res.status(200).json({
      success: true,
      message: "Movies fetched successfully.",
      data: {
        movies
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie fetched successfully.",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const existingMovie = await movieService.getMovieById(req.params.id);

    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    let poster = existingMovie.poster;
    let posterFileId = existingMovie.posterFileId;

    if (req.file) {
      const uploadedImage = await uploadFile(req.file.buffer);

      if (existingMovie.posterFileId) {
        await deleteFile(existingMovie.posterFileId);
      }

      poster = uploadedImage.url;
      posterFileId = uploadedImage.fileId;
    }

    const updatedMovie = await movieService.updateMovie(req.params.id, {
      ...req.body,
      duration: Number(req.body.duration),
      language: JSON.parse(req.body.language),
      poster,
      posterFileId,
    });

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully.",
      data: updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMovieStatus = async (req, res) => {
  try {
    if (!["Active", "Inactive"].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const movie = await movieService.updateMovieStatus(
      req.params.id,
      req.body.status,
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie status updated successfully.",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  updateMovieStatus,
};
