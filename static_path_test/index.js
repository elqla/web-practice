const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const imgDirectory = "../../img";

app.use("/test", express.static("../img/"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// npx nodemon index.js
// 4728d6a6-da10-4349-8e6d-76683f7b5086
