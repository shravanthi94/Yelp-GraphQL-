import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getRestaurantQuery } from '../../queries/query';
import spinner from '../layout/Spinner';
import '../../CSS/dashboard.css';
import imgSrc from '../../images/placeholderimg.jpg';

const Dashboard = ({ data: { restaurant } }) => {
  console.log('Restaurant: ', restaurant);
  return !restaurant ? (
    spinner
  ) : (
    <Fragment>
      <div className='container-dash'>
        <div className='left-dash'>
          <img src={imgSrc} alt='Profile_pic' />
          <h3 className='title-dash'>{restaurant.name}</h3>
          <h3 className='sub-heading'>Contact information</h3>
          <h4 className='title-dash'>
            <i class='far fa-envelope-open'></i> Email
          </h4>
          <p>{restaurant.email}</p>
          <h4 className='title-dash'>
            <i class='fas fa-phone'></i> Phone
          </h4>
          <p>{restaurant.phone}</p>
        </div>
        <div className='middle'>
          <div className='middle-heading'>
            <h1 className='name'>{restaurant.name}</h1>
            <h3>
              <i class='fas fa-map-marker-alt'></i> {restaurant.location}
            </h3>
            <h3>
              <i class='fas fa-clock'></i> {restaurant.timings}
            </h3>
          </div>
          <hr />
          <h2 className='activity'>Description</h2>
          {!restaurant.description ? (
            <p>Tell us about your restaurant...</p>
          ) : (
            <Fragment>
              <h3 className='description'>{restaurant.description}</h3>
            </Fragment>
          )}
          <hr />
          <h2 className='activity'>Popular Reviews</h2>
          {/* {restaurant._id && <Reviews restaurantId={restaurant._id} />} */}
        </div>
        <div className='right-dash'>
          <h3 className='right-heading'>Updates</h3>
          <div className='update-links'>
            <Link to='/restaurant/update/basic' className='btn'>
              <i class='fas fa-address-card'></i> Update restaurant
            </Link>
            <br />
            <Link to='/restaurant/add/dish' className='btn'>
              <i class='fas fa-utensils'></i> Add Dishes
            </Link>
            <h3 className='right-heading'>Full Menu</h3>
            {restaurant.menu ? (
              <Link
                className='btn'
                to={{
                  pathname: '/restaurant/view/menu',
                  state: { menu: restaurant.menu },
                }}
              >
                View Menu
              </Link>
            ) : (
              <p>Please add dishes</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default compose(
  graphql(getRestaurantQuery, {
    options: {
      variables: { restaurant_id: localStorage.getItem('user') },
    },
  }),
)(Dashboard);
