const mongoose = require("mongoose");
require("dotenv").config();

const databaseURI = process.env.MONGO_URI;

const db = mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
