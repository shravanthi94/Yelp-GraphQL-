import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getRestaurantQuery } from '../../../queries/query';
import { updateRestaurantMutation } from '../../../mutations/mutations';
// import spinner from '../../layout/Spinner';
import styles from './form.module.css';

const UpdateRestaurant = ({
  data: { restaurant: profile },
  updateRestaurantMutation,
}) => {
  const [formData, setformData] = useState({
    name: '',
    phone: '',
    location: '',
    description: '',
    cuisine: '',
    deliveryMethod: '',
    timings: '',
  });

  const [success, setsuccess] = useState(false);

  const {
    name,
    phone,
    location,
    description,
    cuisine,
    deliveryMethod,
    timings,
  } = formData;

  useEffect(() => {
    console.log('Use effect', profile);
    setformData({
      name: profile.name ? profile.name : '',
      phone: profile.phone ? profile.phone : '',
      location: profile.location && profile.location,
      description: profile.description ? profile.description : '',
      cuisine: profile.cuisine ? profile.cuisine : '',
      deliveryMethod: profile.deliveryMethod && profile.deliveryMethod,
      timings: profile.timings ? profile.timings : '',
    });
  }, [profile]);

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('calling mutation ', profile);
    console.log('user: ', localStorage.getItem('user'));

    const mutationResponse = await updateRestaurantMutation({
      variables: {
        id: localStorage.getItem('user'),
        name: name || profile.name,
        email: profile.email,
        phone: phone ? phone : profile.phone,
        location: location ? location : profile.location,
        deliveryMethod: deliveryMethod
          ? deliveryMethod
          : profile.deliveryMethod,
        description: description ? description : profile.description,
        cuisine: cuisine ? cuisine : profile.cuisine,
        timings: timings ? timings : profile.timings,
      },
    });

    console.log(mutationResponse);

    if (mutationResponse) {
      const response = mutationResponse.data.updateRestaurant;
      console.log('Res: ', response);
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
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Update Your Details</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Restaurant Name</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Phone</label>
            <br />
            <small className={styles.form_text}>Your contact details</small>
            <input
              className={styles.my_text}
              type='text'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Location</label>
            <br />
            <small className={styles.form_text}>San Jose, Bangalore</small>
            <input
              className={styles.my_text}
              type='text'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Description</label>
            <br />
            <small className={styles.form_text}>California, Bangalore</small>
            <textarea
              className={styles.my_headline}
              maxlength='1024'
              size='30'
              rows='6'
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Cuisine</label>
            <br />
            <small className={styles.form_text}>Continental, Italian</small>
            <input
              className={styles.my_text}
              type='text'
              name='cuisine'
              value={cuisine}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Mode of Delivery</label>
            <br />
            <small className={styles.form_text}>
              Dine In, Curb Side Pick Up...
            </small>
          </div>
          <select
            className='select-css'
            name='deliveryMethod'
            value={deliveryMethod}
            onChange={(e) => onChange(e)}
          >
            <option>Select option</option>
            <option value='Dine In'>Dine In</option>
            <option value='Delivery'>Yelp Delivery</option>
            <option value='Curbside Pick Up'>Curbside Pick Up</option>
          </select>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Timings</label>
            <br />
            <small className={styles.form_text}>
              What time does your restaurant operate?
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='timings'
              value={timings}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Save Changes' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/dashboard'>Cancel</Link>
          </div>
        </form>
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
  graphql(updateRestaurantMutation, { name: 'updateRestaurantMutation' }),
)(UpdateRestaurant);
