import React, { Fragment, useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getRestaurantSearchResults } from '../../queries/query';
import RestaurantCard from './RestaurantCard';
import styles from './restaurant.module.css';

const SearchResults = ({ data: { restaurantSearch: results } }) => {
  const [restaurants, setrestaurants] = useState('');

  const [filter, setfilter] = useState('');

  const handlefilters = (e) => {
    e.preventDefault();

    if (e.target.value === 'All') {
      setrestaurants(results);
    } else {
      setrestaurants(
        results.filter(
          (each) =>
            each.deliveryMethod === e.target.value ||
            each.location.includes(e.target.value),
        ),
      );
    }
    setfilter(e.target.value);
  };

  useEffect(() => {
    setrestaurants(results);
  }, [results]);

  return !restaurants ? (
    'No restaurants found'
  ) : (
    <Fragment>
      <h1 className={styles.form_title} style={{ marginTop: '0px' }}>
        Search Results
      </h1>
      <div style={{ display: 'flex' }}>
        <input
          className='search-input-bar'
          type='text'
          name='filter'
          placeholder='Search by location...'
          value={filter}
          onChange={(e) => handlefilters(e)}
        />
        <select
          className='select-css select-css-width select-orders'
          style={{ width: '250px', marginLeft: '2%' }}
          name='filter'
          value={filter}
          onChange={(e) => handlefilters(e)}
        >
          <option>Select Delivery Option</option>
          <option value='All'>All Restaurants</option>
          <option value='Dine In'>Dine In</option>
          <option value='Curbside Pick Up'>Curbside Pick Up</option>
          <option value='Delivery'>Delivery</option>
        </select>
      </div>
      <hr />
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
  graphql(getRestaurantSearchResults, {
    options: {
      variables: { searchData: localStorage.getItem('searchData') },
    },
  }),
)(SearchResults);
