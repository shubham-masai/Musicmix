const express = require("express");
const playlistrouter = express.Router();
const playlistController = require("../controllers/playlistController");
const { verifyToken } = require("../config/authentication");

// Route for creating a new playlist (requires authentication)
playlistrouter.post("/create", verifyToken, playlistController.createPlaylist);

// Route for updating a playlist (requires authentication)
playlistrouter.put(
  "/update/:playlistId",
  verifyToken,
  playlistController.updatePlaylist
);

// Route for deleting a playlist (requires authentication)
playlistrouter.delete(
  "/delete/:playlistId",
  verifyToken,
  playlistController.deletePlaylist
);

// Route for adding a track to a playlist (requires authentication)
playlistrouter.post(
  "/addtrack/:playlistId",
  verifyToken,
  playlistController.addTrackToPlaylist
);

// Route for removing a track from a playlist (requires authentication)
playlistrouter.delete(
  "/removetrack/:playlistId/:trackId",
  verifyToken,
  playlistController.removeTrackFromPlaylist
);

// Route for getting user's playlists (requires authentication)
playlistrouter.get(
  "/userplaylists",
  verifyToken,
  playlistController.getUserPlaylists
);

module.exports = playlistrouter;
