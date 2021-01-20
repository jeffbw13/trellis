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
      res.status(500).send(new Error(err));
      res.end();
    });
});

app.post("/board", function (req, res, next) {
  //  not using body parser
  var data = "";
  req.on("data", function (chunk) {
    data += chunk;
  });
  req.on("end", function () {
    req.rawBody = data;
    if (data && data.indexOf("{") > -1) {
      req.body = JSON.parse(data);
    }
    //  attack the database
    Board.updateOne(req.body)
      .then((results) => {
        res.write(JSON.stringify("Hey"));
        res.end();
      })
      .catch((err) => {
        res.status(500).send(new Error(err));
        res.end();
      });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
