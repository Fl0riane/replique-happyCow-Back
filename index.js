const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(process.env.MONGOOSE);

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
