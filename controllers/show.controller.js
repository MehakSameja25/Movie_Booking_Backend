const showService = require("../services/show.service");

const createShow = async (req, res) => {
  try {
    const show = await showService.createShow(req.body);

    res.status(201).json({
      success: true,
      message: "Show created successfully",
      data: show,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getShows = async (req, res) => {
  try {
    const { date, cinemaId } = req.query;
    const shows = await showService.getShows(date, cinemaId);

    res.status(200).json({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await showService.getShowById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Show fetched successfully",
      data: show,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateShow = async (req, res) => {
  try {
    const show = await showService.updateShow(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Show updated successfully",
      data: show,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateShowStatus = async (req, res) => {
  try {
    const show = await showService.updateShowStatus(
      req.params.id,
      req.body.status,
    );

    res.status(200).json({
      success: true,
      message: "Show status updated successfully",
      data: show,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createShow,
  getShows,
  getShowById,
  updateShow,
  updateShowStatus,
};
