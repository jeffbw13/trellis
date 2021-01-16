const express = require("express");
const path = require("path");
const Board = require("../database/board");

const app = express();

const port = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname, "../dist")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/board/all", function (req, res) {
  Board.getAll()
    .then((boards) => {
      res.write(JSON.stringify(boards));
      res.end();
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
