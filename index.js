const app = require("./app");
const connectWithDb = require("./config/db");
const logger = require("./logger");
require("dotenv").config();

connectWithDb();

app.listen(process.env.PORT, () => {
  logger.info(`Server is running at port :${process.env.PORT}`);
});
