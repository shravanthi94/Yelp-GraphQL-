import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurant.module.css';
import Rating from 'react-rating';
import spinner from '../layout/Spinner';

const Restaurant = ({ location }) => {
  const restaurant = location.state.restaurant;
  console.log(restaurant);
  const {
    id,
    name,
    email,
    location: loc,
    phone,
    description,
    timings,
    deliveryMethod,
    cuisine,
    menu,
    reviews,
  } = restaurant;

  const displayReview = () => {
    return reviews.map((review) => {
      return (
        <Fragment>
          <div className='box has-background-warning-light'>
            <div className='rating'>
              <Rating
                emptySymbol='far fa-star'
                fullSymbol='fas fa-star'
                fractions={2}
                readonly
                initialRating={review.rating}
              />
              {'  '}
              <small>
                {/* Review on <Date date={review.date.substring(0, 10)} /> */}
              </small>
            </div>
            <p className={styles.headers}>
              <strong>{review.text}</strong>
            </p>
          </div>
        </Fragment>
      );
    });
  };

  return !restaurant ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container1}>
        <div className='columns is-vcentered'>
          <div className='column is-12'>
            <div className='columns'>
              <div className='column is-6'>
                <h1 className={styles.name1}>{name}</h1>
                <p className={styles.headers}>
                  <i class='fas fa-dollar-sign'></i>
                  <i class='fas fa-dollar-sign'></i> | {cuisine}
                </p>
                <p className={styles.headers}>
                  <i class='fas fa-check' style={{ color: 'green' }}></i>{' '}
                  {deliveryMethod}
                </p>
                <br />
                <p className={styles.headers}>
                  <i className='far fa-envelope-open'></i> {email}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-phone'></i> {phone}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-map-marker-alt'></i> {loc}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-clock'></i> {timings}
                </p>
                <br />
                {localStorage.usertype === 'customer' ? (
                  <Fragment>
                    {' '}
                    <Link
                      to={`/customer/addReview/${id}`}
                      className={styles.top_btn}
                    >
                      🌟 Write a Review
                    </Link>
                    <Link
                      to={{
                        pathname: `/customer/placeorder/${id}/${name}`,
                        state: { menu: menu },
                      }}
                      className={styles.top_btn}
                    >
                      Order Now
                    </Link>
                  </Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
            <h1 className={styles.form_title}>Description</h1>
            <hr />
            <p className={styles.headers}>{description}</p>
            <br />
            {menu && (
              <Fragment>
                <Link
                  className={styles.top_btn}
                  to={{
                    pathname: '/restaurant/view/menu',
                    state: { menu: menu },
                  }}
                >
                  View Full Menu
                </Link>
                <hr />
              </Fragment>
            )}
            {localStorage.usertype === 'customer' ? (
              <Fragment>{displayReview()}</Fragment>
            ) : (
              ''
            )}
            <br />
            <Link to='/customer/restaurants' className={styles.top_btn}>
              Back to Restaurants
            </Link>
            <br /> <br />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// export default compose(
//   graphql(getRestaurantQuery, {
//     options: {
//       variables: { restaurant_id: location.state.restaurant },
//     },
//   }),
// )(Restaurant);

export default Restaurant;
