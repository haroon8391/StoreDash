const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected.");
    } catch (err) {
        console.error("An error occurred while connecting to the database:", err);
        process.exit(1);
    }
}

module.exports = connectDB;
