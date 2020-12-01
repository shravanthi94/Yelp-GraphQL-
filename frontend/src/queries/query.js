import { gql } from 'apollo-boost';

const getCustomerQuery = gql`
  query($user_id: String) {
    customer(user_id: $user_id) {
      name
      email
    }
  }
`;

export { getCustomerQuery };
