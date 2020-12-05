import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import { signupRestaurantMutation } from '../../mutations/mutations';
import '../../CSS/form.css';
import jwt_decode from 'jwt-decode';

const Signup = ({ signupRestaurantMutation }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const { name, email, password, location } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const [results, setResults] = useState({
    success: false,
    message: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('here 1');
    const mutationResponse = await signupRestaurantMutation({
      variables: {
        name: name,
        email: email,
        password: password,
        location: location,
      },
    });

    if (mutationResponse) {
      const response = mutationResponse.data.addRestaurant;
      if (response) {
        if (response.status === '200') {
          setResults({
            success: true,
            message: response.message,
          });
        } else {
          setResults({
            message: response.message,
          });
        }
      }
    }
  };

  if (results.success === true) {
    let token = results.message;
    console.log(token);
    localStorage.setItem('token', token);
    var decoded = jwt_decode(token);
    localStorage.setItem('user', decoded.user.id);
    localStorage.setItem('name', decoded.user.name);
    localStorage.setItem('email', decoded.user.email);
    localStorage.setItem('usertype', decoded.user.usertype);
  }

  return results.success === true ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='columns'>
        <div className='column is-two-fifths'>
          <h2 className='form-title'>Sign Up for Yelp</h2>
          <small className='restaurant'>
            Customer? <Link to='/signup'>Signup here</Link>
          </small>
          <br />
          <div>
            <br />
            <form className='yform' onSubmit={(e) => onSubmit(e)}>
              <label className='placeholder-sub'>Name</label>
              <input
                className='my-text'
                id='name'
                name='name'
                placeholder='Name'
                type='name'
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
              <label className='placeholder-sub'>Email</label>
              <input
                className='my-text'
                id='email'
                name='email'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
              <label className='placeholder-sub'>Password</label>
              <input
                className='my-text'
                id='password'
                name='password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
              <label className='placeholder-sub'>Location</label>
              <input
                className='my-text'
                id='location'
                name='location'
                placeholder='Location'
                type='text'
                value={location}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
              <p className='legal-copy'>
                You also understand that Yelp may send marketing emails about
                Yelp’s products, services, and local events. You can unsubscribe
                at any time.
              </p>
              <button type='submit' value='Signup' className='btn-auth'>
                Sign Up
              </button>
            </form>
          </div>
          <div>
            <small>
              Already on Yelp?{' '}
              <Link to='/login' className='signup-link'>
                Log in
              </Link>
            </small>
          </div>
        </div>
        <img
          src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/6b30e7f8206f/assets/img/home/hero_photos/atHzOuzY6J-kKdgKQnCDQQ.jpg'
          alt='dessert_pic'
          className='login-pics'
        />
      </div>
    </Fragment>
  );
};

export default graphql(signupRestaurantMutation, {
  name: 'signupRestaurantMutation',
})(Signup);
