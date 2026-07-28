const Role = require("../models/role.model");
const Permission = require("../models/permission.model");

const seedRolePermissions = async () => {
  const superAdmin = await Role.findOne({
    where: {
      name: "Super Admin",
    },
  });

  const admin = await Role.findOne({
    where: {
      name: "Admin",
    },
  });

  const user = await Role.findOne({
    where: {
      name: "User",
    },
  });

  const fullAccess = await Permission.findOne({
    where: {
      name: "*",
    },
  });

  const adminPermissions = await Permission.findAll({
    where: {
      name: [
        // User
        "user.create",
        "user.read",
        "user.update",
        "user.delete",

        // Role
        "role.create",
        "role.read",
        "role.update",
        "role.delete",
        "role.assignPermission",

        // Permission
        "permission.create",
        "permission.read",
        "permission.update",
        "permission.delete",

        // Cinema
        "cinema.create",
        "cinema.read",
        "cinema.update",
        "cinema.status",

        // Screen
        "screen.create",
        "screen.read",
        "screen.update",
        "screen.status",

        // Seat
        "seat.create",
        "seat.read",
        "seat.update",
        "seat.status",

        // Movie
        "movie.create",
        "movie.read",
        "movie.update",
        "movie.status",

        // Show
        "show.create",
        "show.read",
        "show.update",
        "show.status",
      ],
    },
  });

  await superAdmin.setPermissions([fullAccess]);

  await admin.setPermissions(adminPermissions);

  await user.setPermissions([]);

  console.log("Role Permission Seeded succesfully");
};

module.exports = seedRolePermissions;
