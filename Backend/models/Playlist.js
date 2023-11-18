const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
