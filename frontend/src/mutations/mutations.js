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

const signupCustomerMutation = gql`
  mutation($name: String, $email: String, $password: String) {
    addCustomer(name: $name, email: $email, password: $password) {
      message
      status
    }
  }
`;

export { loginCustomerMutation, signupCustomerMutation };
