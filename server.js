const sequelize = require("./config/database");

require("./models/index");
const seeder = require("./seeders/index");

const app = require("./app");

const PORT = process.env.PORT || 3000;

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: false });
    console.log("Tables synchronized successfully.");

    await seeder();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed.");
    console.error(error);
  }
}

connectDatabase();
