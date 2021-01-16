//  everything for a project is currently stored in the board
const mongoose = require("mongoose");
const db = require("./db");

const BoardSchema = mongoose.Schema({
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

const Board = mongoose.model("Board", BoardSchema);

const getAll = () => {
  let query = Board.find({});
  return query.exec();
};

module.exports = Board;
module.exports.getAll = getAll;
