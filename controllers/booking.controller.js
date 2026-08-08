const bookingService = require("../services/booking.service");

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings(req.user.id, req.user.role);

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully.",
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id, req.user.id, req.user.role);

    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully.",
      data: booking,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
};
