const mongoose = require("mongoose");
const logger = require("../logger");

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(logger.info("DB GOT CONNECTED"))
    .catch((err) => {
      logger.error("DB CONNECTION ISSUE");
      logger.error(err);
      process.exit(1);
    });
};

module.exports = connectWithDb;
