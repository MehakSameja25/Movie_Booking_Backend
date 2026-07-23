const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
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

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions: user.role.permissions.map((permission) => permission.name),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  const userData = user.toJSON();

  delete userData.password;

  return {
    user: userData,
    token,
  };
};

module.exports = {
  login,
};
