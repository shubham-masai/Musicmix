const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  audioFile: {
    type: String, // You can store the path or reference to the audio file
    required: true,
  },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
