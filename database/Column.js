let ColumnSchema = mongoose.Schema({
  header: String,
  cards: [ CardSchema ],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

let Column = mongoose.model('Column', ColumnSchema);

var getAll = () => {
  let query = Column.find({ });
  return query.exec();
};