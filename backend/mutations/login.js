const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const Restaurant = require('../models/RestaurantModel');

const customerLogin = async (args) => {
  let user = await User.findOne({ email: args.email });
  if (!user) {
      return { status: 401, message: "NO_USER" };
  }
  const isMatch = await bcrypt.compare(args.password, user.password);

  if (isMatch) {
      const payload = { 
        user: {
          id: user._id, 
          name: user.name, 
          email: user.email, 
          usertype: 'customer' 
        }
      };

      const token = jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        { expiresIn: 1008000 }
      );

      return { 
        status: 200,
        message: token
      };
  }
  else {
      return { status: 401, message: "INCORRECT_CREDENTIALS" };
  }
}

const restaurantLogin = async (args) => {
  let restaurant = await Restaurant.findOne({ email: args.email });
  if (!restaurant) {
      return { status: 401, message: "NO_RESTAURANT" };
  }
  const isMatch = await bcrypt.compare(args.password, restaurant.password);

  if (isMatch) {
      const payload = { 
        user: {
          id: restaurant._id, 
          name: restaurant.name, 
          email: restaurant.email, 
          usertype: 'restaurant' 
        }
      };

      const token = jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        { expiresIn: 1008000 }
      );

      return { 
        status: 200,
        message: token
      };
  }
  else {
      return { status: 401, message: "INCORRECT_CREDENTIALS" };
  }
}

exports.customerLogin = customerLogin;
exports.restaurantLogin = restaurantLogin;