const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  const movie = await Movie.create(data);

  return movie;
};

const getAllMovies = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;

  const movies = await Movie.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  });

  return movies;
};


const getMovieById = async (id) => {
  const movie = await Movie.findOne({
    where: {
      id,
    },
  });

  return movie;
};

const updateMovie = async (id, data) => {
  const movie = await getMovieById(id);

  if (!movie) {
    return null;
  }

  await movie.update(data);

  return movie;
};

const updateMovieStatus = async (id, status) => {
  const movie = await getMovieById(id);

  if (!movie) {
    return null;
  }

  await movie.update({
    status,
  });

  return movie;
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  updateMovieStatus,
};
