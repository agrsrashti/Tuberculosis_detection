//mongodb
require("./config/db");

const app = require("express")();
const express = require("express");
const port = 8000;

const bodyParser = require("express").json;

const TBRef = require("./routes/TBRefRoutes");

app.use(bodyParser());

//routes path
app.use("/api/TBRef", TBRef);

app.get("/", (req, res) =>
  res.json({ success: true, message: "Welcome to Backend!" })
);

app.listen(port, (req, res) => console.log(`listening on localhost: ${port}`));
