import { gql } from 'apollo-boost';

const getCustomerQuery = gql`
  query($user_id: String) {
    customer(user_id: $user_id) {
      name
      email
      phone
      dob
      city
      state
      country
      nickname
      headline
      thingsILove
      findMeIn
      myBlog
      notYelping
      whyMyReviews
      discovery
    }
  }
`;

const getRestaurantsQuery = gql`
  query {
    restaurants {
      id
      name
      email
      location
      phone
      description
      cuisine
      deliveryMethod
      timings
      menu {
        name
        ingredients
        price
        description
        category
      }
      reviews {
        customer
        rating
        text
        date
      }
    }
  }
`;

const getRestaurantQuery = gql`
  query($restaurant_id: String) {
    restaurant(restaurant_id: $restaurant_id) {
      name
      email
      phone
      timings
      description
      deliveryMethod
      location
      cuisine
      date
      menu {
        name
        ingredients
        price
        description
        category
      }
      reviews {
        customer
        rating
        text
        date
      }
    }
  }
`;

export { getCustomerQuery, getRestaurantsQuery, getRestaurantQuery };
