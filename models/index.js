const User = require("./user.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const RolePermission = require("./rolePermission.model");
const Cinema = require("./cinemas.model");
const Screen = require("./screens.model");
const Seat = require("./seats.model");

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
  as: "roles",
});

Cinema.hasMany(Screen, {
  foreignKey: "cinemaId",
  as: "screens",
});

Screen.belongsTo(Cinema, {
  foreignKey: "cinemaId",
  as: "cinema",
});

Screen.hasMany(Seat, {
  foreignKey: "screenId",
  as: "seats",
});

Seat.belongsTo(Screen, {
  foreignKey: "screenId",
  as: "screen",
});

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Cinema,
  Screen,
  Seat,
};
