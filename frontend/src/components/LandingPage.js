/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../CSS/Landing.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='landing'>
      <div className='main-logo'>
        <a href='#'>
          <img
            src='https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png'
            alt='yelp logo'
            width='160px'
            height='80px'
          />
        </a>
      </div>
      <input
        type='text'
        placeholder="biryani, San Jose, Max's"
        className='field request'
        name='query'
        // value={query}
        // onChange={(e) => setquery(e.target.value)}
        required
      />
      <Link to='#' className='search-button'>
        Search
      </Link>
    </div>
  );
};

export default LandingPage;
