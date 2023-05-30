const express = require("express");
const router = express.Router();
const axios = require("axios");
const Restaurant = require("../models/Restaurant");

router.get("/restaurants", async (req, res) => {
  try {
    let limit = 20;

    const restaurants = await Restaurant.find().limit(limit);

    const count = await Restaurant.countDocuments();

    res.json({
      count: count,
      restaurants: restaurants,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/restaurants/:country", async (req, res) => {
  try {
    let filters = {};
    if (req.query.country) {
      filters.adress = new RegExp(req.query.country, "i");
    }
    // console.log("log filter", filters);
    let page;
    if (Number(req.query.page) < 1) {
      page = 1;
    } else {
      page = Number(req.query.page);
    }

    let limit = 81;

    const restaurants = await Restaurant.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Restaurant.countDocuments(filters);

    res.json({
      count: count,
      restaurants: restaurants,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
