const { Op } = require("sequelize");
const Cinema = require("../models/cinemas.model");
const Screen = require("../models/screens.model");
const Seat = require("../models/seats.model");
const createCinema = async (data) => {
  const cinema = await Cinema.create(data);

  return cinema;
};

const getAllCinemas = async (page = 1, limit = 20, search = '') => {
  const offset = (page - 1) * limit;
  const where = {};
  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }
  const cinemas = await Cinema.findAndCountAll({
    where,

    offset,
    limit,
    order: [["createdAt", "DESC"]],
  });

  return cinemas;
};

const getCinemaById = async (id) => {
  const cinema = await Cinema.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Screen,
        as: "screens",
        include: [
          {
            model: Seat,
            as: "seats",
          },
        ],
      },
    ],
  });

  return cinema;
};

const updateCinema = async (id, data) => {
  const cinema = await getCinemaById(id);

  if (!cinema) {
    return null;
  }

  await cinema.update(data);

  return cinema;
};

const updateCinemaStatus = async (id, status) => {
  const cinema = await getCinemaById(id);

  if (!cinema) {
    return null;
  }

  await cinema.update({
    status,
  });

  return cinema;
};

module.exports = {
  createCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
  updateCinemaStatus,
};

