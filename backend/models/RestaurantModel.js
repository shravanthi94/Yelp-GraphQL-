const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String },
  description: { type: String },
  timings: { type: String },
  cuisine: { type: String },
  deliveryMethod: { type: String },
  menu: [
    {
      name: { type: String, required: true },
      ingredients: { type: String, required: true },
      price: { type: String },
      description: { type: String },
      category: { type: String },
    },
  ],
  reviews: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      name: {
        type: String,
      },
      rating: {
        type: Number,
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: { type: Date, default: Date.now() },
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);
module.exports = Restaurant;
