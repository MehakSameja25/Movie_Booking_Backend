const Screen = require("../models/screens.model");
const Cinema = require("../models/cinemas.model");

const createScreen = async (data) => {
  const cinema = await Cinema.findByPk(data.cinemaId);

  if (!cinema) {
    return null;
  }

  const screen = await Screen.create(data);

  return screen;
};

const getAllScreens = async () => {
  const screens = await Screen.findAll();

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
