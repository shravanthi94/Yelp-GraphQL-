import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { addReviewMutation } from '../../mutations/mutations';
import styles from './Dashboard-forms/form.module.css';

const AddReview = ({ match, addReviewMutation }) => {
  const [formData, setformData] = useState({
    text: '',
    rating: '',
  });

  const [success, setsuccess] = useState(false);

  const { text, rating } = formData;

  const restaurantId = match.params.id;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const mutationResponse = await addReviewMutation({
      variables: {
        name: localStorage.getItem('name'),
        customerId: localStorage.getItem('user'),
        restaurantId: restaurantId,
        text: text,
        rating: parseInt(rating),
      },
    });

    if (mutationResponse) {
      const response = mutationResponse.data.addReview;
      if (response) {
        if (response.status === '200') {
          setsuccess(true);
        } else {
          setsuccess(false);
        }
      }
    }
    window.location.reload();
  };

  return success === true ? (
    <Redirect to='/customer/restaurants' />
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Write Your Review</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Your rating (1-5)</label>
            <br />
            <small className={styles.form_text}>Give us a rating</small>
            <input
              className={styles.my_text}
              type='number'
              placeholder='1-5'
              pattern='[1-5]{1}'
              name='rating'
              value={rating}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Review</label>
            <br />
            <small className={styles.form_text}>
              Tell us what you feel about our restaurant...
            </small>
            <textarea
              className={styles.my_headline}
              maxlength='1024'
              size='30'
              rows='6'
              type='text'
              name='text'
              value={text}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type='submit' value='Submit Review' className={styles.btn} />
          <div className={styles.btn_grey}>
            {/* <Link to={`/restaurant/details/${restaurantId}`}>Cancel</Link> */}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default graphql(addReviewMutation, {
  name: 'addReviewMutation',
})(AddReview);
