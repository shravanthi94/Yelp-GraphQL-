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

const loginRestaurantMutation = gql`
  mutation($email: String, $password: String) {
    loginRestaurant(email: $email, password: $password) {
      message
      status
    }
  }
`;

const signupRestaurantMutation = gql`
  mutation(
    $name: String
    $email: String
    $password: String
    $location: String
  ) {
    addRestaurant(
      name: $name
      email: $email
      password: $password
      location: $location
    ) {
      message
      status
    }
  }
`;

const updateCustomerMutation = gql`
  mutation(
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

const updateRestaurantMutation = gql`
  mutation(
    $id: String
    $name: String
    $email: String
    $phone: String
    $location: String
    $description: String
    $cuisine: String
    $deliveryMethod: String
    $timings: String
  ) {
    updateRestaurant(
      id: $id
      name: $name
      email: $email
      location: $location
      phone: $phone
      description: $description
      cuisine: $cuisine
      deliveryMethod: $deliveryMethod
      timings: $timings
    ) {
      message
      status
    }
  }
`;

const addMenuItemMutation = gql`
  mutation(
    $id: String
    $name: String
    $ingredients: String
    $description: String
    $category: String
    $price: String
  ) {
    addMenu(
      id: $id
      name: $name
      ingredients: $ingredients
      description: $description
      category: $category
      price: $price
    ) {
      message
      status
    }
  }
`;

export {
  loginCustomerMutation,
  signupCustomerMutation,
  loginRestaurantMutation,
  signupRestaurantMutation,
  updateCustomerMutation,
  updateRestaurantMutation,
  addMenuItemMutation,
};
