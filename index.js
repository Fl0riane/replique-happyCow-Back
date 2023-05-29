const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1/happyCow");

const restaurantsRoutes = require("./routes/restaurant");
app.use(restaurantsRoutes);
const usersRoutes = require("./routes/user");
app.use(usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(3000, () => {
  console.log("Server started");
});
