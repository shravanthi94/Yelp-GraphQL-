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
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
