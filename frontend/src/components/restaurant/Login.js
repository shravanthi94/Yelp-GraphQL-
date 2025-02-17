import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import { loginRestaurantMutation } from '../../mutations/mutations';
import '../../CSS/form.css';
import jwt_decode from 'jwt-decode';

const Login = ({ loginRestaurantMutation }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const [results, setResults] = useState({
    success: false,
    message: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const mutationResponse = await loginRestaurantMutation({
      variables: {
        email: email,
        password: password,
      },
    });

    if (mutationResponse) {
      const response = mutationResponse.data.loginRestaurant;
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

    window.location.reload();
  };

  if (results.success === true) {
    let token = results.message;
    console.log(token);
    localStorage.setItem('token', token);
    var decoded = jwt_decode(token);
    console.log(decoded);
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
          <h2 className='form-title'>Log in to Yelp</h2>
          <small className='restaurant'>
            Customer? <Link to='/login'>Login here</Link>
          </small>
          <div>
            <br />
            <form className='yform' onSubmit={(e) => onSubmit(e)}>
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
              <button type='submit' value='login' className='btn-auth'>
                Log In
              </button>
            </form>
          </div>
          <div>
            <small>
              New to Yelp?{' '}
              <Link to='/signup' className='signup-link'>
                Sign up
              </Link>
            </small>
          </div>
        </div>
        <img
          src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/507de6a720e4/assets/img/home/hero_photos/pkwm_5P7XMoIXHOzQR0Y7A.jpg'
          alt='coffee_pic'
          className='login-pics'
        />
      </div>
    </Fragment>
  );
};

export default graphql(loginRestaurantMutation, {
  name: 'loginRestaurantMutation',
})(Login);
