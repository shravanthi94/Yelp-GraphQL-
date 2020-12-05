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

export { getCustomerQuery };
