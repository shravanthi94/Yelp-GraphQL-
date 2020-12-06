import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { updateMenuItemMutation } from '../../../mutations/mutations';
import styles from './form.module.css';

const UpdateMenu = ({ updateMenuItemMutation, location }) => {
  const item = location.state.item;

  const [formData, setformData] = useState({
    name: '',
    ingredients: '',
    price: '',
    description: '',
    category: '',
  });

  const [success, setsuccess] = useState(false);

  const { name, ingredients, price, description, category } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setformData({
      name: item.name,
      ingredients: item.ingredients,
      price: item.price,
      description: item.description,
      category: item.category,
    });
  }, [item]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const mutationResponse = await updateMenuItemMutation({
      variables: {
        id: localStorage.getItem('user'),
        itemId: item.id,
        name: name,
        ingredients: ingredients,
        price: price,
        description: description,
        category: category,
      },
    });
    console.log(mutationResponse);

    if (mutationResponse) {
      const response = mutationResponse.data.updateMenu;
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

  if (success === true) {
    console.log('Successs');
  }

  return success === true ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Add a Dish</h1>
        <p className='lead'>
          <i className='fas fa-utensils'></i> List your amazing dishes here...
        </p>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Dish Name</label>
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
            <label className={styles.form_label}>Main Ingredients</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='ingredients'
              value={ingredients}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Price</label>
            <br />
            <small className={styles.form_text}>12.50, 32.54</small>
            <input
              className={styles.my_text}
              type='text'
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Description</label>
            <br />
            <small className={styles.form_text}>
              We sell continental, Italian...
            </small>
            <textarea
              className={styles.my_headline}
              maxLength='1024'
              size='30'
              rows='6'
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Category</label>
            <br />
            <small className={styles.form_text}>
              Appetizer, Salads, Main Course , Desserts, Beverages
            </small>
            <small className={styles.form_text}>This field is required.</small>
          </div>
          <select
            className='select-css'
            name='category'
            onChange={(e) => onChange(e)}
            required
          >
            <option>Select option</option>
            <option value='Appetizer'>Appetizer</option>
            <option value='Salads'>Salads</option>
            <option value='Main Course'>Main Course</option>
            <option value='Desserts'>Desserts</option>
            <option value='Beverages'>Beverages</option>
          </select>
          <br />
          <br />
          <input type='submit' value='Add Dish' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/dashboard'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default graphql(updateMenuItemMutation, {
  name: 'updateMenuItemMutation',
})(UpdateMenu);
