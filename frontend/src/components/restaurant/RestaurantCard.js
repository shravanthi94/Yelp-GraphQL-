import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurant.module.css';
import resImg from '../../images/restaurant.jpg';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Fragment>
      <Fragment>
        <div
          class='box border has-background-info-light'
          style={{ color: 'black', width: '900px' }}
        >
          <article class='media'>
            <div class='media-content'>
              <div class='content'>
                <div className='columns'>
                  <div className='column is-5'>
                    <img
                      className={styles.img}
                      src={resImg}
                      alt='Restaurant_image'
                    />
                  </div>
                  <div className='column is-7'>
                    <p>
                      <strong>
                        <Link
                          className={styles.rest_name}
                          to={{
                            pathname: '/restaurant/details',
                            state: { restaurant: restaurant },
                          }}
                        >
                          {restaurant.name}
                        </Link>
                      </strong>
                      <br />
                    </p>
                    <p>
                      <i class='fas fa-check' style={{ color: 'green' }}></i>{' '}
                      {restaurant.deliveryMethod}
                    </p>
                    <p>
                      <i class='far fa-envelope-open'></i> {restaurant.email}
                    </p>
                    <p>
                      <i class='fas fa-phone'></i> {restaurant.phone}
                    </p>
                    <p>
                      <i class='fas fa-map-marker-alt'></i>{' '}
                      {restaurant.location}
                    </p>
                    <p>
                      <i class='fas fa-clock'></i> {restaurant.timings}
                    </p>
                    <p>{restaurant.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default RestaurantCard;
