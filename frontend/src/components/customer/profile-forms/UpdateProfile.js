import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getCustomerQuery } from '../../../queries/query';
import { updateCustomerMutation } from '../../../mutations/mutations';
// import spinner from '../../layout/Spinner';
import styles from './form.module.css';

const UpdateProfile = ({
  data: { customer: profile },
  updateCustomerMutation,
}) => {
  const [formData, setformData] = useState({
    name: '',
    dateOfBirth: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    nickName: '',
    headline: '',
    thingsILove: '',
    findMeIn: '',
    myBlog: '',
    whenNotYelping: '',
    whyReadMyReviews: '',
    recentDiscovery: '',
  });

  const [success, setsuccess] = useState(false);

  const {
    name,
    dateOfBirth,
    city,
    state,
    country,
    phone,
    nickname,
    headline,
    thingsILove,
    findMeIn,
    myBlog,
    whenNotYelping,
    whyReadMyReviews,
    recentDiscovery,
  } = formData;

  useEffect(() => {
    setformData({
      name: profile.name ? profile.name : '',
      city: profile.city && profile.city,
    });
  }, [profile]);

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('calling mutation ', profile);
    console.log('user: ', localStorage.getItem('user'));

    const mutationResponse = await updateCustomerMutation({
      variables: {
        id: localStorage.getItem('user'),
        name: name || profile.name,
        email: profile.email,
        dob: dateOfBirth || profile.dob,
        city: city ? city : profile.city,
        phone: phone || profile.phone,
        state: state || profile.state,
        country: country || profile.country,
        nickname: nickname || profile.nickname,
        headline: headline || profile.headline,
        thingsILove: thingsILove || profile.thingsILove,
        findMeIn: findMeIn || profile.findMeIn,
        myBlog: myBlog || profile.myBlog,
        whenNotYelping: whenNotYelping || profile.whenNotYelping,
        whyReadMyReviews: whyReadMyReviews || profile.whyReadMyReviews,
        recentDiscovery: recentDiscovery || profile.recentDiscovery,
      },
      // refetchQueries: [
      //   {
      //     query: getCustomerQuery,
      //     variables: { user_id: localStorage.getItem('user') },
      //   },
      // ],
    });

    console.log(mutationResponse);

    if (mutationResponse) {
      const response = mutationResponse.data.updateCustomer;
      console.log('ResL: ', response);
      if (response) {
        if (response.status === '200') {
          setsuccess(true);
        } else {
          setsuccess(false);
        }
      }
    }
  };

  return success === true ? (
    <Redirect to='/profile' />
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Update Your Details</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Full Name</label>
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
            <label className={styles.form_label}>Your Date of Birth</label>
            <br />
            <small className={styles.form_text}>Your birthday</small>
            <input
              className={styles.my_text}
              type='text'
              placeholder='MM-DD-YYYY'
              name='dateOfBirth'
              value={dateOfBirth}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>City</label>
            <br />
            <small className={styles.form_text}>San Jose, Bangalore</small>
            <input
              className={styles.my_text}
              type='text'
              name='city'
              value={city}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>State</label>
            <br />
            <small className={styles.form_text}>California, Bangalore</small>
            <input
              className={styles.my_text}
              type='text'
              name='state'
              value={state}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Country</label>
            <br />
            <small className={styles.form_text}>United States, India</small>
            <input
              className={styles.my_text}
              type='text'
              name='country'
              value={country}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Phone</label>
            <br />
            <input
              className={styles.my_headline}
              type='text'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Nickname</label>
            <br />
            <small className={styles.form_text}>
              The Boss, Calamity Jane, The Prolific Reviewer
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='nickName'
              value={nickname}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Your Headline</label>
            <br />
            <small className={styles.form_text}>
              Taco Tuesday Aficionado, The Globetrotting Reviewer
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='headline'
              value={headline}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>I Love...</label>
            <br />
            <small className={styles.form_text}>
              Comma separated phrases (e.g. sushi, Radiohead, puppies)
            </small>
            <textarea
              className={styles.my_headline}
              maxlength='1024'
              size='30'
              rows='6'
              type='text'
              name='thingsILove'
              value={thingsILove}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Find Me In</label>
            <br />
            <small className={styles.form_text}>
              Nob Hill, the newest brunch spot, a turtleneck
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='findMeIn'
              value={findMeIn}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>My Blog Or Website</label>
            <br />
            <small className={styles.form_text}>
              www.example.com/myawesomeblog
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='myBlog'
              value={myBlog}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>When I’m Not Yelping...</label>
            <br />
            <small className={styles.form_text}>
              I’m missing out, I’m working at the art gallery, I’m probably at
              the movies
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='whenNotYelping'
              value={whenNotYelping}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>
              Why You Should Read My Reviews
            </label>
            <br />
            <small className={styles.form_text}>
              They’re useful, funny, and cool; I tell it like it is; I eat out
              all the time
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='whyReadMyReviews'
              value={whyReadMyReviews}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Most Recent Discovery</label>
            <br />
            <small className={styles.form_text}>
              Ponies are not baby horses; coconut oil in coffee is actually
              amazing
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='recentDiscovery'
              value={recentDiscovery}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Save Changes' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/profile'>Cancel</Link>
          </div>
        </form>
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
  graphql(updateCustomerMutation, { name: 'updateCustomerMutation' }),
)(UpdateProfile);
