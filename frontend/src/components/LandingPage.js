/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Landing.css';

const LandingPage = () => {
  const [searchData, setsearchData] = useState('');
  const handleSearch = (e) => {
    localStorage.setItem('searchData', searchData);
  };

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
        name='searchData'
        value={searchData}
        onChange={(e) => setsearchData(e.target.value)}
        required
      />
      <Link
        onClick={(e) => handleSearch(e)}
        to='/restaurant/searchResults'
        className='search-button'
      >
        Search
      </Link>
    </div>
  );
};

export default LandingPage;
