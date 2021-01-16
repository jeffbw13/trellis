const mongoose = require("mongoose");
const Board = require("./board");

mongoose.connect("mongodb://localhost/trellis");

Board.deleteMany({}, () => {
  console.log("board.deletemany is done");
});

const board = {
  userId: 1,
  boardName: "My Big Board",
  lists: [
    {
      header: "To Do",
      cards: [
        { header: "Create Database", status: "incomplete" },
        { header: "Seed Database", status: "incomplete" },
        { header: "Create UI", status: "incomplete" },
      ],
    },
    {
      userId: 1,
      cards: [
        { header: "Feed Cat", status: "complete" },
        { header: "Beat Cat", status: "complete" },
        { header: "Bleed Cat", status: "complete" },
        { header: "Eat Cat", status: "complete" },
      ],
    },
  ],
};

Board.create(board)
  .then(() => console.log("board populated"))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
