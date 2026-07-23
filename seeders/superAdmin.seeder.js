const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const Role = require("../models/role.model");

const seedSuperAdmin = async () => {
  const role = await Role.findOne({
    where: {
      name: "Super Admin",
    },
  });

  if (!role) {
    throw new Error("Super Admin role not found.");
  }

  const existingUser = await User.findOne({
    where: {
      email: "admin@gmail.com",
    },
  });

  if (existingUser) {
    console.log("Super Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    firstName: "Super",
    lastName: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    roleId: role.id,
  });

  console.log("Super Admin created successfully.");
};

module.exports = seedSuperAdmin;
