import { gql } from 'apollo-boost';

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

console.log('calling mutation 2');
const updateCustomerMutation = gql`
  mutation updateCustomer(
    $id: String
    $name: String
    $email: String
    $phone: String
    $dob: String
    $city: String
    $state: String
    $country: String
    $nickname: String
    $headline: String
    $thingsILove: String
    $findMeIn: String
    $myBlog: String
    $notYelping: String
    $whyMyReviews: String
    $discovery: String
  ) {
    updateCustomer(
      id: $id
      name: $name
      email: $email
      password: $password
      dob: $dob
      city: $city
      state: $state
      country: $country
      phone: $phone
      nickname: $nickname
      headline: $headline
      thingsILove: $thingsILove
      findMeIn: $findMeIn
      myBlog: $myBlog
      notYelping: $notYelping
      whyMyReviews: $whyMyReviews
      discovery: $discovery
    ) {
      message
      status
    }
  }
`;

export {
  loginCustomerMutation,
  signupCustomerMutation,
  updateCustomerMutation,
};
