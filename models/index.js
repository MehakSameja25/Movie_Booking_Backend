const User = require("./user.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const RolePermission = require("./rolePermission.model");
const Cinema = require("./cinemas.model");
const Screen = require("./screens.model");
const Seat = require("./seats.model");
const Movie = require("./movie.model");
const Show = require("./show.model");
const Booking = require("./booking.model");
const BookingSeat = require("./bookingSeat.model");

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

// ! --------Movie & Show Relation---------  *****
Movie.hasMany(Show, {
  foreignKey: "movieId",
  as: "shows",
});

Show.belongsTo(Movie, {
  foreignKey: "movieId",
  as: "movie",
});
// ! --------Movie & Show Relation---------  *****

// ? --------Screen & Show Relation--------- *****
Screen.hasMany(Show, {
  foreignKey: "screenId",
  as: "shows",
});

Show.belongsTo(Screen, {
  foreignKey: "screenId",
  as: "screen",
});
// ? --------Screen & Show Relation--------- *****

// ! --------Booking Relations--------- *****
User.hasMany(Booking, { foreignKey: "userId", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "userId", as: "user" });

Show.hasMany(Booking, { foreignKey: "showId", as: "bookings" });
Booking.belongsTo(Show, { foreignKey: "showId", as: "show" });

Booking.hasMany(BookingSeat, { foreignKey: "bookingId", as: "seats" });
BookingSeat.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });

Seat.hasMany(BookingSeat, { foreignKey: "seatId", as: "bookingSeats" });
BookingSeat.belongsTo(Seat, { foreignKey: "seatId", as: "seat" });
// ! --------Booking Relations--------- *****

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Cinema,
  Screen,
  Seat,
  Movie,
  Show,
  Booking,
  BookingSeat,
};
