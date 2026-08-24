const { Op } = require("sequelize");
const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  const movie = await Movie.create(data);

  return movie;
};

const getAllMovies = async (page = 1, limit = 20, search = '') => {
  const offset = (page - 1) * limit;
  const where = {};
  if (search) {
    where.title = { [Op.like]: `%${search}%` };
  }
  const movies = await Movie.findAndCountAll({
    where,

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
