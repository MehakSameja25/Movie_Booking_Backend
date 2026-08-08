const { Booking, BookingSeat, Seat, Show, User } = require("../models");
const sequelize = require("../config/database");

const createBooking = async (userId, data) => {
  const { showId, seatIds, totalAmount } = data;

  const t = await sequelize.transaction();

  try {
    const existingBookings = await BookingSeat.findAll({
      where: {
        showId,
        seatId: seatIds,
      },
      transaction: t,
    });

    if (existingBookings.length > 0) {
      throw new Error("One or more selected seats are already booked.");
    }

    const booking = await Booking.create(
      {
        userId,
        showId,
        totalAmount,
        status: "Confirmed",
      },
      { transaction: t }
    );
    const bookingSeatsData = seatIds.map((seatId) => ({
      bookingId: booking.id,
      seatId,
      showId,
    }));

    await BookingSeat.bulkCreate(bookingSeatsData, { transaction: t });

    await t.commit();
    return booking;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAllBookings = async (userId, userRole) => {
  const whereClause = userRole === "Admin" ? {} : { userId };

  return await Booking.findAll({
    where: whereClause,
    include: [
      { model: User, as: "user", attributes: ["id", "firstName", "lastName", "email"] },
      { model: Show, as: "show" },
      {
        model: BookingSeat,
        as: "seats",
        include: [{ model: Seat, as: "seat" }],
      },
    ],
  });
};

const getBookingById = async (id, userId, userRole) => {
  const booking = await Booking.findOne({
    where: { id },
    include: [
      { model: User, as: "user", attributes: ["id", "firstName", "lastName", "email"] },
      { model: Show, as: "show" },
      {
        model: BookingSeat,
        as: "seats",
        include: [{ model: Seat, as: "seat" }],
      },
    ],
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (userRole !== "Admin" && booking.userId !== userId) {
    throw new Error("Unauthorized to access this booking.");
  }

  return booking;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
};
