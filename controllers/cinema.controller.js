const cinemaService = require("../services/cinema.service");

const createCinema = async (req, res) => {
  try {
    const cinema = await cinemaService.createCinema(req.body);

    return res.status(201).json({
      success: true,
      message: "Cinema created successfully.",
      data: cinema,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await cinemaService.getAllCinemas();

    return res.status(200).json({
      success: true,
      message: "Cinemas fetched successfully",
      data: cinemas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCinemaById = async (req, res) => {
  try {
    const cinema = await cinemaService.getCinemaById(req.params.id);

    if (!cinema) {
      return res.status(404).json({
        success: false,
        message: "Cinema not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cinema fetched successfully",
      data: cinema,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCinema = async (req, res) => {
  try {
    const cinema = await cinemaService.updateCinema(req.params.id, req.body);

    if (!cinema) {
      return res.status(404).json({
        success: false,
        message: "Cinema not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cinema updated successfully.",
      data: cinema,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCinemaStatus = async (req, res) => {
  try {
    if (!["Active", "Inactive"].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const cinema = await cinemaService.updateCinemaStatus(
      req.params.id,
      req.body.status,
    );

    if (!cinema) {
      return res.status(404).json({
        success: false,
        message: "Cinema not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cinema status updated successfully.",
      data: cinema,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
  updateCinemaStatus,
};
