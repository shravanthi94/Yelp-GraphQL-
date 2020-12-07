const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  dob: { type: String },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  nickname: {
    type: String,
  },
  headline: {
    type: String,
  },
  thingsILove: {
    type: String,
  },
  findMeIn: {
    type: String,
  },
  myBlog: {
    type: String,
  },
  notYelping: {
    type: String,
  },
  whyMyReviews: {
    type: String,
  },
  discovery: {
    type: String,
  },
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
