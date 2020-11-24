import { gql } from 'apollo-boost';

console.log('mutation 1');

const loginCustomerMutation = gql`
  mutation($email: String, $password: String) {
    loginCustomer(email: $email, password: $password) {
      message
      status
    }
  }
`;

export { loginCustomerMutation };
