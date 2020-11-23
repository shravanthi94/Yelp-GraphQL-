const Restaurant = require('../models/RestaurantModel');

const updateRestaurant = async (args) => {
  let restaurant = await Restaurant.findById(args.id);
  if (restaurant) {
    if (args.name) restaurant.name = args.name;
    if (args.email) restaurant.email = args.email;
    if (args.phone) restaurant.phone = args.phone;
    if (args.location) restaurant.location = args.location;
    if (args.description) restaurant.description = args.description;
    if (args.timings) restaurant.timings = args.timings;
    if (args.cuisine) restaurant.cuisine = args.cuisine;
    if (args.deliveryMethod) restaurant.deliveryMethod = args.deliveryMethod;

    let savedRestaurant = await restaurant.save();

    if (savedRestaurant) {
      return { status: 200, message: 'RESTAURANT_UPDATED' };
    } else {
      return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
    }
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const addMenu = async (args) => {
  const { id, name, ingredients, price, description, category } = args;

  const restaurant = await Restaurant.findById(id).select('-password');
  if (restaurant) {
    const newMenuItem = {
      name,
      ingredients,
      price,
      description,
      category,
    };

    restaurant.menu.unshift(newMenuItem);

    const updatedRestaurant = await restaurant.save();
    if (updatedRestaurant) {
      return { status: 200, message: 'MENU_ADDED' };
    } else {
      return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
    }
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const updateMenu = async (args) => {
  const { id, itemId, name, ingredients, price, description, category } = args;

  //   const restaurant = await Restaurant.updateOne(
  //     { _id: id, 'menu.name': name },
  //     {
  //       $set: {
  //         'menu.name': name,
  //         'menu.ingredients': ingredients,
  //         'menu.price': price,
  //         'menu.description': description,
  //         'menu.category': category,
  //       },
  //     },
  //   );

  const restaurant = await Restaurant.findById(id);

  restaurant.menu.forEach((item) => {
    if (item._id.toString() === itemId) {
      item.name = name;
      item.ingredients = ingredients;
      item.price = price;
      item.description = description;
      item.category = category;
    }
  });

  const savedRestaurant = await restaurant.save();

  if (savedRestaurant) {
    return { status: 200, message: 'MENU_UPDATED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

exports.addMenu = addMenu;
exports.updateRestaurant = updateRestaurant;
exports.updateMenu = updateMenu;
