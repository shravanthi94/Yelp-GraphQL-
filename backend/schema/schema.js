const graphql = require('graphql');
const User = require('../models/UserModel');
const Restaurant = require('../models/RestaurantModel');
const Order = require('../models/OrderModel');

const { customerSignup, restaurantSignup } = require('../mutations/signup');
const { customerLogin, restaurantLogin } = require('../mutations/login');
const {
  updateCustomer,
  addReview,
  restaurantSearch,
} = require('../mutations/profile');
const { updateRestaurant, addMenu, updateMenu } = require('../mutations/menu');
const { placeOrder, updateOrder, cancelOrder } = require('../mutations/order');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    dob: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    nickname: { type: GraphQLString },
    headline: { type: GraphQLString },
    thingsILove: { type: GraphQLString },
    findMeIn: { type: GraphQLString },
    myBlog: { type: GraphQLString },
    notYelping: { type: GraphQLString },
    whyMyReviews: { type: GraphQLString },
    discovery: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    timings: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    deliveryMethod: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    menu: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return parent.menu;
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return parent.reviews;
      },
    },
    date: { type: GraphQLString },
  }),
});

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'Reviews',
  fields: () => ({
    id: { type: GraphQLString },
    customer: { type: GraphQLString },
    name: { type: GraphQLString },
    rating: { type: GraphQLInt },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Orders',
  fields: () => ({
    customer: { type: GraphQLID },
    restaurant: { type: GraphQLID },
    item: { type: GraphQLString },
    deliveryOption: { type: GraphQLString },
    status: { type: GraphQLString },
    type: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: UserType,
      args: { user_id: { type: GraphQLString } },
      async resolve(parent, args) {
        let user = await User.findById(args.user_id);
        if (user) {
          return user;
        }
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      args: { restaurant_id: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurant = await Restaurant.findById(args.restaurant_id);
        console.log('here');
        if (restaurant.reviews) {
          return restaurant.reviews;
        }
      },
    },
    restaurant: {
      type: RestaurantType,
      args: { restaurant_id: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurant = await Restaurant.findById(args.restaurant_id);
        if (restaurant) {
          return restaurant;
        }
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      args: { input: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurants = await Restaurant.find().select('-password');
        if (restaurants) {
          return restaurants;
        }
      },
    },
    menu: {
      type: new GraphQLList(MenuType),
      args: { restaurant_id: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurant = await Restaurant.findById(args.user_id);
        if (restaurant.menu) {
          return restaurant.menu;
        }
      },
    },
    customerOrders: {
      type: new GraphQLList(OrderType),
      args: { customerId: { type: GraphQLString } },
      async resolve(parent, args) {
        let orders = await Order.find({ customer: args.customerId });
        if (orders) {
          return orders;
        }
      },
    },
    restaurantOrders: {
      type: new GraphQLList(OrderType),
      args: { restaurantId: { type: GraphQLString } },
      async resolve(parent, args) {
        let orders = await Order.find({ restaurant: args.restaurantId });
        if (orders) {
          return orders;
        }
      },
    },
    restaurantSearch: {
      type: new GraphQLList(RestaurantType),
      args: { searchData: { type: GraphQLString } },
      resolve(parent, args) {
        return restaurantSearch(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return customerSignup(args);
      },
    },
    addRestaurant: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return restaurantSignup(args);
      },
    },
    loginCustomer: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return customerLogin(args);
      },
    },
    loginRestaurant: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return restaurantLogin(args);
      },
    },
    updateCustomer: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        dob: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        nickname: { type: GraphQLString },
        headline: { type: GraphQLString },
        thingsILove: { type: GraphQLString },
        findMeIn: { type: GraphQLString },
        myBlog: { type: GraphQLString },
        notYelping: { type: GraphQLString },
        whyMyReviews: { type: GraphQLString },
        discovery: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateCustomer(args);
      },
    },
    updateRestaurant: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        deliveryMethod: { type: GraphQLString },
        timings: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateRestaurant(args);
      },
    },
    addMenu: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        price: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addMenu(args);
      },
    },
    updateMenu: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
        itemId: { type: GraphQLString },
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        price: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateMenu(args);
      },
    },
    addReview: {
      type: StatusType,
      args: {
        customerId: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        name: { type: GraphQLString },
        rating: { type: GraphQLInt },
        text: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addReview(args);
      },
    },
    placeOrder: {
      type: StatusType,
      args: {
        customerId: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        item: { type: GraphQLString },
        deliveryOption: { type: GraphQLString },
      },
      resolve(parent, args) {
        return placeOrder(args);
      },
    },
    updateOrder: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateOrder(args);
      },
    },
    cancelOrder: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return cancelOrder(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
