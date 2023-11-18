const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const db = require("./config/database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tracks", trackRoutes);
app.use("/playlists", playlistRoutes);

app.listen(port, async () => {
  await db;
  console.log("DB connected");
  console.log(`Server is running on port ${port}`);
});
