const mongoose = require("mongoose");

const Restaurant = mongoose.model("Restaurant", {
  placeId: Number,
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lng: Number,
    lat: Number,
    required: true,
  },
  phone: { type: Number, required: true },
  thumbnail: String,
  type: { type: String, required: true },
  category: Number,
  rating: Number,
  vegan: Number,
  vegOnly: Number,
  link: String,
  description: { type: String, required: true },
  pictures: [String],
  price: String,
  website: String,
  facebook: String,
  nearbyPlacesIds: [Number],
});

module.exports = Restaurant;
