const seatService = require("../services/seat.service");

const getSeatsByScreenId = async (req, res) => {
  try {
    const seats = await seatService.getSeatsByScreenId(req.params.screenId);

    return res.status(200).json({
      success: true,
      message: "Seats fetched successfully.",
      data: seats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSeatById = async (req, res) => {
  try {
    const seat = await seatService.getSeatById(req.params.id);

    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "Seat not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat fetched successfully.",
      data: seat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSeatStatus = async (req, res) => {
  try {
    if (!["Available", "Booked", "Blocked"].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat status.",
      });
    }

    const seat = await seatService.updateSeatStatus(
      req.params.id,
      req.body.status,
    );

    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "Seat not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat status updated successfully.",
      data: seat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSeatsByScreenId,
  getSeatById,
  updateSeatStatus,
};
