const express = require("express");
const trackrouter = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for creating a new track
trackrouter.post(
  "/create",
  upload.single("audioFile"),
  trackController.createTrack
);

trackrouter.get("/list", trackController.getTracks);

trackrouter.get("/detail/:trackId", trackController.getTrackDetail);

trackrouter.get("/stream/:trackId", trackController.streamTrack);

trackrouter.get("/duration/:trackId", trackController.getAudioDuration);

module.exports = trackrouter;
