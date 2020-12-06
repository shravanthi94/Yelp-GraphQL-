import React, { Fragment } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    window.localStorage.clear();
  };

  const guestLinks = (
    <div className='right-nav'>
      <Link to='/login' className='header-nav-link'>
        Log In
      </Link>
      <Link to='/signup' className='header-nav-button'>
        Sign Up
      </Link>
    </div>
  );

  const authLinks = (
    <div className='right-nav'>
      {localStorage.usertype === 'restaurant' ? (
        <Link to='/dashboard' className='header-nav-link'>
          <i className='fas fa-user'></i> Dashboard
        </Link>
      ) : (
        <Link to='/profile' className='header-nav-link'>
          <i className='fas fa-user'></i> Profile
        </Link>
      )}
      <a href='/' onClick={handleLogout} className='header-nav-link'>
        Logout
      </a>
    </div>
  );

  const customerLinks = (
    <Fragment>
      <Link to='/customer/orders' className='header-nav-link'>
        Orders
      </Link>
      <Link to='/customer/restaurants' className='header-nav-link'>
        Restaurants
      </Link>
    </Fragment>
  );

  const restaurantLinks = (
    <Link to='/restaurant/orders' className='header-nav-link'>
      Orders
    </Link>
  );

  return (
    <Fragment>
      <div className='top-nav'>
        <div className='left-nav'>
          <Link to='/' className='header-nav-link'>
            <img src={logo} className='logo' alt='logo-img' />
          </Link>
          {localStorage.token &&
            (localStorage.usertype === 'customer'
              ? customerLinks
              : restaurantLinks)}
        </div>
        {!localStorage.token ? guestLinks : authLinks}
      </div>
    </Fragment>
  );
};

export default Navbar;
