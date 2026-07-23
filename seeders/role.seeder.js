const Role = require("../models/role.model");

const seedRoles = async () => {
  const roles = [
    {
      name: "Super Admin",
      description: "Full system access",
    },
    {
      name: "Admin",
      description: "Manage users, roles and permissions",
    },
    {
      name: "User",
      description: "Regular user",
    },
  ];

  for (const role of roles) {
    await Role.findOrCreate({
      where: {
        name: role.name,
      },
      defaults: role,
    });
  }

  console.log("Roles seeded successfully.");
};

module.exports = seedRoles;
