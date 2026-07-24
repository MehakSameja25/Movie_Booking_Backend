const User = require("./user.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const RolePermission = require("./rolePermission.model");
const Cinema = require("./cinemas.model");
const Screen = require("./screens.model");
const Seat = require("./seats.model");

// ! --------User & Role Relation---------  *****
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});
// ! --------User & Role Relation---------  ****

// ? --------Role & Permission Relation---------   ****
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
// ? --------Role & Permission Relation---------   ****

// ! --------Cinema & Screen Relation---------  *****
Cinema.hasMany(Screen, {
  foreignKey: "cinemaId",
  as: "screens",
});

Screen.belongsTo(Cinema, {
  foreignKey: "cinemaId",
  as: "cinema",
});
// ! --------Cinema & Screen Relation---------  *****

// ? --------Screen & Seat Relation---------  *****
Screen.hasMany(Seat, {
  foreignKey: "screenId",
  as: "seats",
});

Seat.belongsTo(Screen, {
  foreignKey: "screenId",
  as: "screen",
});
// ? --------Screen & Seat Relation---------  *****

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Cinema,
  Screen,
  Seat,
};
