const screenService = require("../services/screen.service");

const createScreen = async (req, res) => {
  try {
    const screen = await screenService.createScreen(req.body);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Cinema not found.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Screen created successfully.",
      data: screen,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllScreens = async (req, res) => {
  try {
    const screens = await screenService.getAllScreens();

    return res.status(200).json({
      success: true,
      message: "Screens fetched successfully.",
      data: screens,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getScreenById = async (req, res) => {
  try {
    const screen = await screenService.getScreenById(req.params.id);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Screen fetched successfully.",
      data: screen,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateScreen = async (req, res) => {
  try {
    const screen = await screenService.updateScreen(req.params.id, req.body);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Screen updated successfully.",
      data: screen,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateScreenStatus = async (req, res) => {
  try {
    if (!["Active", "Inactive"].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const screen = await screenService.updateScreenStatus(
      req.params.id,
      req.body.status,
    );

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Screen status updated successfully.",
      data: screen,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createScreen,
  getAllScreens,
  getScreenById,
  updateScreen,
  updateScreenStatus,
};
