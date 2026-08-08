const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;
    await authService.resetPassword(email, token, password);

    return res.status(200).json({
      success: true,
      message: "Password successfully reset.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
