const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const roleRoutes = require("./routes/role.route");
const permissionRoutes = require("./routes/permission.route");
const authRoutes = require("./routes/auth.route");
const cinemaRoutes = require("./routes/cinema.route");
const screenRoutes = require("./routes/screen.route");
const seatRoutes = require("./routes/seat.route");

const authMiddleware = require("./middlewares/auth.middleware");

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/users", authMiddleware.authenticate, userRoutes);
app.use("/roles", authMiddleware.authenticate, roleRoutes);
app.use("/permissions", authMiddleware.authenticate, permissionRoutes);
app.use("/permissions", authMiddleware.authenticate, permissionRoutes);
app.use("/cinemas", authMiddleware.authenticate, cinemaRoutes);
app.use("/screens", authMiddleware.authenticate, screenRoutes);
app.use("/seats", authMiddleware.authenticate, seatRoutes);

module.exports = app;
