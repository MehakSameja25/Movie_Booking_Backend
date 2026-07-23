const seedRoles = require("./role.seeder");
const seedPermissions = require("./permission.seeder");
const seedRolePermissions = require("./rolePermission.seeder");
const seedSuperAdmin = require("./superAdmin.seeder");

const seedDatabase = async () => {
  await seedRoles();
  await seedPermissions();
  await seedRolePermissions();
  await seedSuperAdmin();
};

module.exports = seedDatabase;
