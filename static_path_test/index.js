const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const fs = require("fs");
const { sanitize } = require("sanitize-filename"); // FilePath Custom

/**
 * Run serve
 * npx nodemon index.js
 *  */

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 1. Static folder Access
app.use("/test", express.static("./public"));
// How to use
// localhost:4000/test/filename.png

// 2. Local Video file Send to Client
app.get("/videofile/:filename", async (req, res) => {
  const { filename } = req.params;
  // const filePath = path.join(__dirname, "test", filename);
  const filePath = path.join(__dirname, "../public", filename);
  console.log("filePath", filePath);
  const getFileStatSize = fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("stat", stats.size);
    return stats.size;
  });
  try {
    const fileStream = await fs.createReadStream(filePath);
    res.set({
      "Content-Type": "video/mp4",
      "Content-Length": getFileStatSize, // file size setting
    });
    // 2-1 __ with filestream ___ unable to control video files on the client side. close to the stream method.
    // fileStream.pipe(res);
    // 2-2 __ with sendFile __ Just send VideoFile to client side.
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
