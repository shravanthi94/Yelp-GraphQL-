import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getCustomerQuery } from '../../queries/query';
import userImg from '../../images/placeholderimg.jpg';
import spinner from '../layout/Spinner';
import '../../CSS/profile.css';

const Profile = ({ data: { customer: profile } }) => {
  return !profile ? (
    spinner
  ) : (
    <Fragment>
      <div className='profile-container'>
        <div className='left-profile'>
          <img src={userImg} alt='Profile-pic' />
          <h3 className='profile-title'>{profile.name}'s Profile</h3>
          <h3 className='subheading'>Contact information</h3>
          <h4 className='profile-title'>Email</h4>
          <p>{profile.email}</p>
          <h4 className='profile-title'>Phone</h4>
          <p>{profile.phone}</p>
        </div>
        <div className='middle'>
          <div className='middle-heading'>
            <h1 className='name'>{profile.name}</h1>
            <h3>
              <i class='fas fa-home'></i>
              {profile.city}, {profile.state},{profile.country}
            </h3>
            {!profile.nickname ? (
              ''
            ) : (
              <Fragment>
                <h3>
                  <i class='fas fa-chess-pawn'></i>
                  {'   '} Call me *{profile.nickname}*
                </h3>
              </Fragment>
            )}
          </div>
          <hr />
          <h2 className='activity'>Headline</h2>
          {!profile.headline ? (
            <Fragment>
              <p>Add your headline...</p>
              <br />
            </Fragment>
          ) : (
            <Fragment>
              <h4 className='headline'>{profile.headline}</h4>
            </Fragment>
          )}
          {!profile.dob ? (
            ''
          ) : (
            <Fragment>
              <h2 className='activity'>Don't forget to wish me on</h2>
              <h4 className='profile-title'>
                <i class='fas fa-birthday-cake'></i>{' '}
                {/* <Date date={profile.dob} /> */}
              </h4>
              <br />
            </Fragment>
          )}
          <h2 className='activity'>Recent Activity</h2>
          {/* {displayEvents()} */}
        </div>
        <div className='right-profile'>
          <div className='update-links'>
            <Link to='/update/basic' className='btn-update'>
              <i class='fas fa-address-card'></i> Update Basics
            </Link>
            <Link to='/update/about' className='btn-update'>
              <i class='fas fa-user'></i> Update About
            </Link>
            <Link to='/update/contact' className='btn-update'>
              <i class='fas fa-phone-alt'></i> Update Contact
            </Link>
          </div>
          <div>
            <h3 className='subheading'>About {profile.name}</h3>
            <h4 className='profile-title'>Location</h4>
            {!profile.city ? (
              ''
            ) : (
              <p>
                <i class='fas fa-home'></i> {profile.city}, {profile.state},{' '}
                {profile.country}
              </p>
            )}
            <h4 className='profile-title'>Yelping Since</h4>
            <p>
              {/* <i class='fas fa-calendar-day'></i> <Date date={profile.date} /> */}
            </p>
            <h4 className='profile-title'>Things I Love</h4>
            {!profile.thingsILove ? (
              <p>You haven't told us yet ... do tell!</p>
            ) : (
              <p>
                <i class='fas fa-heart'></i> {profile.thingsILove}
              </p>
            )}

            {!profile.findMeIn ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>Find me in</h4>
                <p>
                  <i class='fas fa-plane-departure'></i> {profile.findMeIn}
                </p>
              </Fragment>
            )}
            {!profile.myBlog ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>My Blog</h4>
                <p>
                  <i class='fas fa-blog'></i> {profile.myBlog}
                </p>
              </Fragment>
            )}
            {!profile.notYelping ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>When not yelping</h4>
                <p>
                  <i class='fas fa-hourglass-half'></i> {profile.notYelping}
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default compose(
  graphql(getCustomerQuery, {
    options: {
      variables: { user_id: localStorage.getItem('user') },
    },
  }),
)(Profile);
