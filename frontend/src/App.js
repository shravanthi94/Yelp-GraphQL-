import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendURI from './webConfig';

// Yelp Application Pages
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

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
            <Switch></Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
