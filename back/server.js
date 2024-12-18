const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobRoutes = require("./routes/job.routes");
const logger = require("./utils/logger");
require("dotenv").config();
const sequelize = require("./config/db"); // Sequelize instance

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/jobs", jobRoutes);

sequelize
  .sync({ alter: true })
  .then(() => logger.info("Database synchronized"))
  .catch((err) => logger.error("Error synchronizing database:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
