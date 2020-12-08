import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getRestaurantsQuery } from '../../queries/query';
import RestaurantCard from './RestaurantCard';
import styles from './restaurant.module.css';

const AllRestaurants = ({ data: { restaurants } }) => {
  return !restaurants ? (
    'No restaurants found'
  ) : (
    <Fragment>
      <h1 className={styles.form_title} style={{ marginTop: '0px' }}>
        All Restaurants
      </h1>
      {restaurants.map((res) => {
        return (
          <Fragment>
            <RestaurantCard restaurant={res} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default compose(
  graphql(getRestaurantsQuery, {
    options: {
      variables: { user_id: localStorage.getItem('user') },
    },
  }),
)(AllRestaurants);
