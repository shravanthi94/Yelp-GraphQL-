const User = require('../models/UserModel');
const Restaurant = require('../models/RestaurantModel');

const updateCustomer = async (args) => {
  let user = await User.findById(args.id);
  if (user) {
    if (args.name) user.name = args.name;
    if (args.email) user.email = args.email;
    if (args.phone) user.phone = args.phone;
    if (args.dob) user.dob = args.dob;
    if (args.city) user.city = args.city;
    if (args.state) user.state = args.state;
    if (args.country) user.country = args.country;
    if (args.nickname) user.nickname = args.nickname;
    if (args.headline) user.headline = args.headline;
    if (args.findMeIn) user.findMeIn = args.findMeIn;
    if (args.myBlog) user.myBlog = args.myBlog;
    if (args.thingsILove) user.thingsILove = args.thingsILove;
    if (args.notYelping) user.notYelping = args.notYelping;
    if (args.whyMyReviews) user.whyMyReviews = args.whyMyReviews;
    if (args.discovery) user.discovery = args.discovery;

    let savedUser = await user.save();

    if (savedUser) {
      return { status: 200, message: 'USER_UPDATED' };
    } else {
      return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
    }
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const addReview = async (args) => {
  const { customerId, restaurantId, rating, text, name } = args;
  const restaurant = await Restaurant.findById(restaurantId);
  const newReview = {
    customer: customerId,
    name,
    rating,
    text,
  };

  restaurant.reviews.unshift(newReview);

  const savedRestaurant = await restaurant.save();
  if (savedRestaurant) {
    return { status: 200, message: 'REVIEW_ADDED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const restaurantSearch = async (args) => {
  const { searchData } = args;
  const restaurants = await Restaurant.find({
    $or: [
      { name: { $regex: `.*${searchData}.*` } },
      { location: { $regex: `.*${searchData}.*` } },
      { 'menu.name': { $regex: `.*${searchData}.*` } },
      { cuisine: { $regex: `.*${searchData}.*` } },
      { deliveryMethod: { $regex: `.*${searchData}.*` } },
    ],
  });
  if (restaurants) {
    return restaurants;
  }
};

exports.updateCustomer = updateCustomer;
exports.addReview = addReview;
exports.restaurantSearch = restaurantSearch;
