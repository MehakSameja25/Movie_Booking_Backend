const Permission = require("../models/permission.model");

const seedPermissions = async () => {
  const permissions = [
    {
      name: "*",
      description: "Full system access",
    },

    // User Permissions
    {
      name: "user.create",
      description: "Create users",
    },
    {
      name: "user.read",
      description: "View users",
    },
    {
      name: "user.update",
      description: "Update users",
    },
    {
      name: "user.delete",
      description: "Delete users",
    },

    // Role Permissions
    {
      name: "role.create",
      description: "Create roles",
    },
    {
      name: "role.read",
      description: "View roles",
    },
    {
      name: "role.update",
      description: "Update roles",
    },
    {
      name: "role.delete",
      description: "Delete roles",
    },

    {
      name: "role.assignPermission",
      description: "Assign permissions to roles",
    },

    // Permission Permissions
    {
      name: "permission.create",
      description: "Create permissions",
    },
    {
      name: "permission.read",
      description: "View permissions",
    },
    {
      name: "permission.update",
      description: "Update permissions",
    },
    {
      name: "permission.delete",
      description: "Delete permissions",
    },

    // Cinema Permissions
    {
      name: "cinema.create",
      description: "Create cinemas",
    },
    {
      name: "cinema.read",
      description: "View cinemas",
    },
    {
      name: "cinema.update",
      description: "Update cinemas",
    },

    {
      name: "cinema.status",
      description: "Update cinema status",
    },

    // Screen Permissions
    {
      name: "screen.create",
      description: "Create screens",
    },
    {
      name: "screen.read",
      description: "View screens",
    },
    {
      name: "screen.update",
      description: "Update screens",
    },
    {
      name: "screen.status",
      description: "Update screen status",
    },

    // Seat Permissions
    {
      name: "seat.create",
      description: "Create seats",
    },
    {
      name: "seat.read",
      description: "View seats",
    },
    {
      name: "seat.update",
      description: "Update seats",
    },
    {
      name: "seat.status",
      description: "Update seat status",
    },

    // Movie Permissions
    {
      name: "movie.create",
      description: "Create movies",
    },
    {
      name: "movie.read",
      description: "View movies",
    },
    {
      name: "movie.update",
      description: "Update movies",
    },
    {
      name: "movie.status",
      description: "Update movie status",
    },

    // Show Permissions
    {
      name: "show.create",
      description: "Create shows",
    },
    {
      name: "show.read",
      description: "View shows",
    },
    {
      name: "show.update",
      description: "Update shows",
    },
    {
      name: "show.status",
      description: "Update show status",
    },
  ];

  for (const permission of permissions) {
    await Permission.findOrCreate({
      where: {
        name: permission.name,
      },
      defaults: permission,
    });
  }

  console.log("Permissions seeded successfully.");
};

module.exports = seedPermissions;
