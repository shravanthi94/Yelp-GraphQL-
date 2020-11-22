const User = require('../models/UserModel');
const Restaurant = require('../models/RestaurantModel');
const bcrypt = require('bcryptjs');

const customerSignup = async (args) => {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(args.password, salt);

    let newUser = new User({
        name: args.name,
        email: args.email,
        password: hashedPassword,
    });

    let user = await User.find({ email: args.email });
    if (user.length) {
        return { status: 400, message: "USER_EXISTS" };
    }
    let savedUser = await newUser.save();
    if (savedUser) {
        return { status: 200, message: "USER_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const restaurantSignup = async (args) => {
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(args.password, salt);

  let newRestaurant = new Restaurant({
      name: args.name,
      email: args.email,
      password: hashedPassword,
      location: args.location
  });

  let restaurant = await Restaurant.find({ email: args.email });
  if (restaurant.length) {
      return { status: 400, message: "RESTAURANT_EXISTS" };
  }
  let savedRestaurant = await newRestaurant.save();
  if (savedRestaurant) {
      return { status: 200, message: "RESTAURANT_ADDED" };
  }
  else {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

exports.customerSignup = customerSignup;
exports.restaurantSignup = restaurantSignup;