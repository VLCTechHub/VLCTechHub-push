const mongoose = require("mongoose");
const dotenv = require("dotenv");
const notificationsController = require("./controllers/notifications");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env" });

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/vlctechhub" || process.env.MONGOLAB_URI
);
mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

notificationsController.sendPushNotificationsForType("events");
notificationsController.sendPushNotificationsForType("jobs");
