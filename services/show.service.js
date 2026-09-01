const { Show, Movie, Screen, BookingSeat, Booking, Seat } = require("../models");
const { Op } = require("sequelize");

const createShow = async (data) => {
  const movie = await Movie.findByPk(data.movieId);

  if (!movie) {
    throw new Error("Movie not found.");
  }

  const screen = await Screen.findByPk(data.screenId);

  if (!screen) {
    throw new Error("Screen not found.");
  }

  const start = new Date(`2000-01-01T${data.startTime}`);
  start.setMinutes(start.getMinutes() + movie.duration);

  const endTime = start.toTimeString().split(" ")[0];

  const conflictingShow = await Show.findOne({
    where: {
      screenId: data.screenId,
      showDate: data.showDate,
      status: "Active",

      startTime: {
        [Op.lt]: endTime,
      },

      endTime: {
        [Op.gt]: data.startTime,
      },
    },
  });

  if (conflictingShow) {
    throw new Error(
      "Another show is already scheduled for this screen at this time.",
    );
  }

  const show = await Show.create({
    ...data,
    endTime,
  });

  return show;
};

const getShows = async (date, cinemaId) => {
  const where = {
    status: "Active",
  };


  if (date) {
    where.showDate = date;
  }

  const screenInclude = {
    model: Screen,
    as: "screen",
    attributes: ["id", "name"],
  };

  if (cinemaId) {
    screenInclude.where = { cinemaId };
  }

  const shows = await Show.findAll({
    where,
    include: [
      {
        model: Movie,
        as: "movie",
        attributes: ["id", "title", "poster"],
      },
      screenInclude,
    ],
  });

  return shows;
};

const getShowById = async (id) => {
  const show = await Show.findOne({
    where: {
      id,
      status: "Active",
    },
    include: [
      {
        model: Movie,
        as: "movie",
        attributes: ["id", "title", "poster"],
      },
      {
        model: Screen,
        as: "screen",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!show) {
    throw new Error("Show not found.");
  }

  return show;
};

const updateShow = async (id, data) => {
  const show = await getShowById(id);

  await show.update(data);

  return show;
};

const updateShowStatus = async (id, status) => {
  const show = await getShowById(id);

  await show.update({
    status,
  });

  return show;
};

const getShowSeats = async (showId) => {
  const show = await Show.findByPk(showId);
  if (!show) throw new Error('Show not found.');

  const seats = await Seat.findAll({
    where: { screenId: show.screenId },
    order: [['row', 'ASC'], ['column', 'ASC']]
  });

  const bookedSeats = await BookingSeat.findAll({
    where: { showId: show.id },
    include: [{
      model: Booking,
      as: 'booking',
      where: { status: { [Op.ne]: 'Cancelled' } }
    }]
  });

  const bookedSeatIds = bookedSeats.map(bs => bs.seatId);

  return seats.map(seat => {
    const s = seat.toJSON();
    if (bookedSeatIds.includes(s.id) && s.status !== 'Blocked') {
      s.status = 'Booked';
    }
    return s;
  });
};

module.exports = {
  getShowSeats,
  createShow,
  getShows,
  getShowById,
  updateShow,
  updateShowStatus,
};

