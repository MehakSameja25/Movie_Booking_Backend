const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.route");
const roleRoutes = require("./routes/role.route");
const permissionRoutes = require("./routes/permission.route");
const authRoutes = require("./routes/auth.route");
const cinemaRoutes = require("./routes/cinema.route");
const screenRoutes = require("./routes/screen.route");
const seatRoutes = require("./routes/seat.route");
const movieRoutes = require("./routes/movie.route");
const showRoutes = require("./routes/show.route");
const bookingRoutes = require("./routes/booking.route");

const authMiddleware = require("./middlewares/auth.middleware");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/users", authMiddleware.authenticate, userRoutes);
app.use("/roles", authMiddleware.authenticate, roleRoutes);
app.use("/permissions", authMiddleware.authenticate, permissionRoutes);
app.use("/permissions", authMiddleware.authenticate, permissionRoutes);
app.use("/cinemas", cinemaRoutes);
app.use("/screens", screenRoutes);
app.use("/seats", authMiddleware.authenticate, seatRoutes);
app.use("/movies", movieRoutes);
app.use("/shows", showRoutes);
app.use("/bookings", authMiddleware.authenticate, bookingRoutes);

module.exports = app;
