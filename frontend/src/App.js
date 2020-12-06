import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendURI from './webConfig';

// Yelp Application Pages
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

// Customer Links
import Login from './components/customer/Login';
import Signup from './components/customer/Signup';
import Profile from './components/customer/Profile';
import UpdateProfile from './components/customer/profile-forms/UpdateProfile';

// Restaurant Links
import SignupRes from './components/restaurant/Signup';
import LoginRes from './components/restaurant/Login';
import Dashboard from './components/restaurant/Dashboard';
import AllRestaurants from './components/restaurant/AllRestaurants';
import UpdateRestaurant from './components/restaurant/Dashboard-forms/UpdateRestaurant';
import Menu from './components/restaurant/Menu';
import AddDish from './components/restaurant/Dashboard-forms/AddMenu';
import UpdateDish from './components/restaurant/Dashboard-forms/UpdateMenu';
import Restaurant from './components/restaurant/Restaurant';

// Apollo client setup
const client = new ApolloClient({
  uri: `${backendURI}/graphql`,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={LandingPage} />
          <section className='max-container'>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/restaurant/signup' component={SignupRes} />
              <Route exact path='/restaurant/login' component={LoginRes} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route
                exact
                path='/customer/profile/update'
                component={UpdateProfile}
              />
              <Route
                exact
                path='/customer/restaurants'
                component={AllRestaurants}
              />
              <Route
                exact
                path='/restaurant/update/basic'
                component={UpdateRestaurant}
              />
              <Route exact path='/restaurant/view/menu' component={Menu} />
              <Route exact path='/restaurant/add/dish' component={AddDish} />
              <Route
                exact
                path='/restaurant/item/update'
                component={UpdateDish}
              />
              <Route exact path='/restaurant/details' component={Restaurant} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
