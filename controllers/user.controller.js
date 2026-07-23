const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: "firstName, lastName and email are required.",
      });
    }

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists.",
      });
    }

    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const findUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userService.findUser(id);

    if (user === null) {
      res.status(404).json({
        message: "Invalid Id, User not found.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};
