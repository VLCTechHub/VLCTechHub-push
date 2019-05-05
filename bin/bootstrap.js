const mongoose = require("mongoose")
const dotenv = require("dotenv")

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env" })

const connectToMongo = cb => {
    mongoose.Promise = global.Promise
    mongoose
        .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/vlctechhub", {
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASS,
        })
        .then(cb, err => {
            console.error(err)
            console.log("%s MongoDB connection error. Please make sure MongoDB is running.", chalk.red("✗"))
            process.exit()
        })
}

module.exports = {
    connectToMongo,
}
