//  everything for a project is currently stored in the board
const mongoose = require("mongoose");
const db = require("./db");

const boardSchema = mongoose.Schema({
  userId: Number,
  boardName: String,
  lists: [
    {
      header: String,
      cards: [
        {
          header: String,
          description: String,
          dueDate: { type: Date },
          status: String,
          participants: [Number],
          activities: [{ description: String, date: { type: Date } }],
        },
      ],
    },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const Board = mongoose.model("board", boardSchema);

const getAll = () => {
  const query = Board.find({});
  return query.exec();
};

const updateOne = (board) => {
  const query = Board.findOneAndUpdate({ _id: board._id }, board);
  return query.exec();
};

const addOne = (board) => {};

module.exports = Board;
module.exports.getAll = getAll;
module.exports.updateOne = updateOne;
module.exports.addOne = addOne;
