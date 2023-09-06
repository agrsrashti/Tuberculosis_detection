require("dotenv").config();
const mongoose = require("mongoose");
var db;
mongoose
  .connect(process.env.MONGODB_URI)
  .then((client) => {
    console.log("DB Connected");
    db = client;
  })
  .catch((err) => console.log(err));

module.exports = db;
