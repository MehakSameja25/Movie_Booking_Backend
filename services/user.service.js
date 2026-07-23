const { where } = require("sequelize");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  userData.password = hashedPassword;

  const user = await User.create(userData);

  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });

  return users;
};

const findUser = async (id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Role,
        as: "role",
        include: [
          {
            model: Permission,
            as: "permissions",
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });

  return user;
};

const updateUser = async (id, userData) => {
  const user = await findUser(id);

  if (!user) {
    return null;
  }

  await user.update(userData);

  return user;
};

const deleteUser = async (id) => {
  const user = await findUser(id);

  if (!user) {
    return null;
  }

  await user.destroy();

  return true;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  findUser,
  updateUser,
  deleteUser,
  findUserByEmail,
};
