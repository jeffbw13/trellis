const app = require("express");

app.get("/",(req, res) => {
  app.send("Sup, dude!");
});

app.listen("3000", () => {
  console.log("Listening on port 3000")
});