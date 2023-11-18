const fs = require("fs");
const path = require("path");

class AudioService {
  constructor(audioDirectory) {
    this.audioDirectory = audioDirectory;
  }

  // Stream audio by providing the track's file name and the response object (res)
  streamAudio(fileName, res) {
    const audioPath = path.join(this.audioDirectory, fileName);

    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(audioPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "audio/mpeg",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "audio/mpeg",
      };

      res.writeHead(200, head);
      fs.createReadStream(audioPath).pipe(res);
    }
  }
}

module.exports = AudioService;
