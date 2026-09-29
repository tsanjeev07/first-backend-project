const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log("Connect to DB");
}

module.exports = connectDB;
