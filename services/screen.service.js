const Screen = require("../models/screens.model");
const Cinema = require("../models/cinemas.model");
const Seat = require("../models/seats.model");

const createScreen = async (data) => {
  const cinema = await Cinema.findByPk(data.cinemaId);

  if (!cinema) {
    throw new Error("Cinema not found.");
  }

  const screen = await Screen.create(data);

  const seats = [];

  for (let row = 0; row < data.rows; row++) {
    const rowLetter = String.fromCharCode(65 + row);

    for (let column = 1; column <= data.columns; column++) {
      const seatNumber = `${rowLetter}${column}`;

      seats.push({
        screenId: screen.id,
        row: rowLetter,
        column,
        seatNumber,
        status: "Available",
      });
    }
  }

  await Seat.bulkCreate(seats);

  return screen;
};

const getAllScreens = async (page = 1, limit = 20, cinemaId = null) => {
  const offset = (page - 1) * limit;

  const where = {};
  if (cinemaId) {
    where.cinemaId = cinemaId;
  }

  const screens = await Screen.findAndCountAll({
    where,
    offset,
    limit,
    include: [
      {
        model: Cinema,
        as: "cinema",
        attributes: ["id", "name", "location"],
      }
    ],
    order: [["createdAt", "DESC"]],
  });

  return screens;
};

const getScreenById = async (id) => {
  const screen = await Screen.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Cinema,
        as: "cinema",
        attributes: ["id", "name", "location"],
      },
      {
        model: Seat,
        as: "seats",
        attributes: ["id", "seatNumber", "status"],
      },
    ],
  });

  return screen;
};

const updateScreen = async (id, data) => {
  const screen = await getScreenById(id);

  if (!screen) {
    return null;
  }

  await screen.update(data);

  return screen;
};

const updateScreenStatus = async (id, status) => {
  const screen = await getScreenById(id);

  if (!screen) {
    return null;
  }

  await screen.update({
    status,
  });

  return screen;
};

module.exports = {
  createScreen,
  getAllScreens,
  getScreenById,
  updateScreen,
  updateScreenStatus,
};

