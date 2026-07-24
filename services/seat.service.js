const Seat = require("../models/seats.model");

const getSeatsByScreenId = async (screenId) => {
  const seats = await Seat.findAll({
    where: {
      screenId,
    },
    order: [
      ["row", "ASC"],
      ["column", "ASC"],
    ],
  });

  return seats;
};

const getSeatById = async (id) => {
  const seat = await Seat.findOne({
    where: {
      id,
    },
  });

  return seat;
};

const updateSeatStatus = async (id, status) => {
  const seat = await getSeatById(id);

  if (!seat) {
    return null;
  }

  await seat.update({
    status,
  });

  return seat;
};

module.exports = {
  getSeatsByScreenId,
  getSeatById,
  updateSeatStatus,
};
