const express = require("express");
const router = express.Router();
const axios = require("axios");
const Restaurant = require("../models/Restaurant");

router.get("/restaurants", async (req, res) => {
  try {
    let limit = 20;

    const restaurants = await Restaurant.find().limit(limit);

    res.json({
      restaurants: restaurants,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(error).json({ error: error.message });
  }
});

router.get("/restaurants/country", async (req, res) => {
  try {
    let count = 0;
    let filters = {};
    if (req.query.address) {
      filters.address = new RegExp(`, ${req.query.address}`, "i");
    } else {
      filters.address = "paris";
    }

    if (req.query.type) {
      filters.type = new RegExp(req.query.type, "i");
    }

    let page;
    if (req.query.page) {
      if (req.query.page < 1) {
        page = 1;
      } else {
        page = req.query.page;
      }
    } else page = 1;

    let limit = 81;

    const restaurants = await Restaurant.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(filters);
    console.log(page);
    count = await Restaurant.countDocuments(filters);

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
