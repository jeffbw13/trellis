const ColSchema = require('./Column');

const BoardSchema = mongoose.Schema({
  userId: Number,
  boardName: String,
  columns: [ColumnSchema],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

const Board = mongoose.model('Board', BoardSchema);

const getAll = () => {
  let query = Board.find({ });
  return query.exec();
};