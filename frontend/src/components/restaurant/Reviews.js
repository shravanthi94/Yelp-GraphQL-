import React, { Fragment } from 'react';
import styles from './Dashboard-forms/form.module.css';
import Rating from 'react-rating';

const Reviews = ({ reviews }) => {
  const displayReviews = () => {
    return reviews.map((each) => {
      return (
        <Fragment>
          <div className='box review'>
            <div className='rating'>
              <p>Review given by {each.name}</p>
              <br />
              <Fragment>
                <div className='rating'>
                  <Rating
                    emptySymbol='far fa-star'
                    fullSymbol='fas fa-star'
                    fractions={2}
                    readonly
                    initialRating={each.rating}
                  />
                  {'  '}
                  <small>Review on {each.date.substring(0, 10)}</small>
                </div>
                <p className={styles.headers}>
                  <strong>{each.text}</strong>
                </p>
                <br />
              </Fragment>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  return reviews.length === 0 ? (
    <div className='container profile-title'>No Reviews Added Yet...</div>
  ) : (
    <Fragment>
      <div className='container profile-title'>{displayReviews()}</div>
    </Fragment>
  );
};

export default Reviews;
