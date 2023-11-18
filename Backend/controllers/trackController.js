const Track = require("../models/Track");
const fs = require("fs");
const mm = require("music-metadata");
const rangeParser = require("range-parser");

// Controller for creating a new track
exports.createTrack = async (req, res) => {
  const { title, artist, album } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required." });
    }

    const audioFilePath = req.file.path;

    const track = new Track({
      title,
      artist,
      album,
      audioFile: audioFilePath,
    });

    const savedTrack = await track.save();

    res
      .status(201)
      .json({ message: "Track created successfully", track: savedTrack });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Track creation failed. Please try again." });
  }
};

// Controller for getting a list of all tracks
exports.getTracks = async (req, res) => {
  try {
    // Retrieve and send a list of all tracks
    const tracks = await Track.find();

    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tracks." });
  }
};

// Controller for getting details of a specific track
exports.getTrackDetail = async (req, res) => {
  const { trackId } = req.params;

  try {
    // Find the track by ID
    const track = await Track.findById(trackId);

    if (!track) {
      return res.status(404).json({ message: "Track not found." });
    }

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving track details." });
  }
};

// Controller for streaming audio of a specific track
exports.streamTrack = async (req, res) => {
  const { trackId } = req.params;

  try {
    const track = await Track.findById(trackId);

    if (!track) {
      return res.status(404).json({ message: "Track not found." });
    }

    const audioFilePath = track.audioFile;

    res.set("content-type", "audio/mpeg");

    const audioStream = fs.createReadStream(audioFilePath);
    audioStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error streaming track audio." });
  }
};

exports.getAudioDuration = async (req, res) => {
  const { trackId } = req.params;

  try {
    const track = await Track.findById(trackId);

    if (!track) {
      return res.status(404).json({ message: "Track not found." });
    }

    const audioFilePath = track.audioFile;

    const metadata = await mm.parseFile(audioFilePath);
    const duration = metadata.format.duration;

    res.json({ duration });
  } catch (error) {
    res.status(500).json({ message: "Error fetching audio duration." });
  }
};
