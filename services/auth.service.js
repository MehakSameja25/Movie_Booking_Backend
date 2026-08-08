const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const sendEmail = require("../utils/email.utils");

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

const forgotPassword = async (email) => {
  const user = await User.findOne({
    where: { email },
    include: [{ model: Role, as: "role" }],
  });

  if (!user) {
    throw new Error("No user found with that email address.");
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET + user.password, // secret tied to password
    { expiresIn: "15m" }
  );

  const resetURL =
    user.role.name === "Super Admin" || user.role.name === "Admin"
      ? `${process.env.FRONTEND_ADMIN_URL}/auth/reset-password?token=${token}&mail=${email}`
      : `${process.env.FRONTEND_USER_URL}/reset-password?token=${token}&mail=${email}`;

  const message = `Forgot your password? Submit a PATCH request with your new password to: \n${resetURL}\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 15 min)",
      message,
    });
  } catch (err) {
    console.error("Email sending failed:", err);
    throw new Error("There was an error sending the email. Try again later!");
  }
};

const resetPassword = async (email, token, newPassword) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET + user.password);
    if (decoded.id !== user.id) {
      throw new Error("Invalid token.");
    }
  } catch (err) {
    throw new Error("Token is invalid or has expired.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedPassword });
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
