let CardSchema = mongoose.Schema({
  header: String,
  description: String,
  dueDate: { type: Date }.
  activities: [{ description: String, {date: Date, default: Date.now}}],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

//  also: members, labels

let Card = mongoose.model('Card', CardSchema);

var getAll = () => {
  let query = Card.find({ });
  return query.exec();
};