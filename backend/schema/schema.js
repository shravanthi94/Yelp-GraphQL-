const graphql = require('graphql');
const { resolve } = require('path');
const User = require('../models/UserModel');

const { customerSignup, restaurantSignup } = require('../mutations/signup');
const { customerLogin } = require('../mutations/login');

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
      }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

