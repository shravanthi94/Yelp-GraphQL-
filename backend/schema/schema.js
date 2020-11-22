const graphql = require('graphql');
const { resolve } = require('path');
const User = require('../models/UserModel');

const { customerSignup, restaurantSignup } = require('../mutations/signup');
const { customerLogin, restaurantLogin } = require('../mutations/login');

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
      image: { type: GraphQLString },
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
      reviews : {
        type: new GraphQLList(ReviewType),
        resolve(parent, args) {
            return parent.customerReviews;
        }
      }
  })
});

const ReviewType = new GraphQLObjectType({
  name: 'Reviews',
  fields: () => ({
      _id: { type: GraphQLID },
      restaurant: { type: GraphQLID },
      rating: { type: GraphQLInt },
      text: { type: GraphQLString },
      date: { type: GraphQLString },
      
  })
});

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString }
  })
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
          }
      },
      customerReviews: {
        type: new GraphQLList(ReviewType),
          args: { user_id: { type: GraphQLString } },
          async resolve(parent, args) {
              let user = await User.findById(args.user_id);
              console.log('here');
              if (user.reviews) {
                  return user.reviews;
              }
        }
      }
    }
  });

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addCustomer: {
        type: StatusType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        async resolve(parent, args) {
            return customerSignup(args);
        }
      },
      addRestaurant: {
        type: StatusType,
        args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          location: { type: GraphQLString }
        },
        async resolve(parent, args) {
          return restaurantSignup(args);
        }
      },
      loginCustomer: {
        type: StatusType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve(parent, args) {
            return customerLogin(args);
        }
      },
      loginRestaurant: {
        type: StatusType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve(parent, args) {
            return restaurantLogin(args);
        }
      }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

