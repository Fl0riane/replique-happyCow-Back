const express = require("express");
const router = express.Router();
const axios = require("axios");
const Restaurant = require("../models/Restaurant");

router.get("/restaurants", async (req, res) => {
  try {
    const name = req.query.name || "";
    const limit = req.query.limit || "50";
    const skip = req.query.skip || "0";
    const country = req.query.country || "0";

    const response = await axios.get(
      `http://mongodb://localhost:27017/happyCow/restaurants?name=${name}&country=${country}&limit=${limit}&skip=${skip}`
    );

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
