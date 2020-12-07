import React, { Fragment, useState } from 'react';
import styles from '../restaurant/Dashboard-forms/form.module.css';
import { placeorderMutation } from '../../mutations/mutations';
import { graphql } from 'react-apollo';

const Placeorder = ({ placeorderMutation, location, match }) => {
  const [deliveryOption, setdeliveryOption] = useState('');
  const [itemName, setitemName] = useState('');

  const [success, setsuccess] = useState(false);

  const menu = location.state.menu;

  const onSubmit = async (e) => {
    e.preventDefault();

    const mutationResponse = await placeorderMutation({
      variables: {
        customerId: localStorage.getItem('user'),
        restaurantId: match.params.id,
        item: itemName,
        deliveryOption: deliveryOption,
      },
    });

    if (mutationResponse) {
      const response = mutationResponse.data.placeOrder;
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

  return (
    <Fragment>
      {success === true && <div>Order placed</div>}
      <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
        {menu.map((item) => {
          return (
            <Fragment>
              <div class='tile is-ancestor'>
                <div class='tile is-parent is-7'>
                  <article class='tile is-child box'>
                    <div className='columns'>
                      <div className='column is-9'>
                        <p class={styles['item-title']}>{item.name}</p>
                        <p class={styles['item-ingredients']}>
                          {item.ingredients} <br /> $ {item.price}
                        </p>
                        <p class={styles['item-description']}>
                          {item.description}
                        </p>
                        <br />
                        <div>
                          <label for='forItem' className={styles.form_label}>
                            Select item
                          </label>
                          <input
                            type='checkbox'
                            name='item'
                            value={itemName}
                            id='forItem'
                            onClick={(e) => setitemName(item.name)}
                          />
                        </div>
                        <br />
                        <h1 className={styles.form_label}>
                          Select mode of delivery
                        </h1>
                        <select
                          className='select-css select-orders'
                          // style={{ width: '100px' }}
                          name='deliveryOption'
                          value={deliveryOption}
                          onChange={(e) => setdeliveryOption(e.target.value)}
                        >
                          <option>Select option</option>
                          <option value='Delivery'>Delivery</option>
                          <option value='Pickup'>Pick up</option>
                        </select>
                        <br />
                        <input
                          type='submit'
                          value='Place Order'
                          className='place-order'
                        />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </Fragment>
          );
        })}
      </form>
    </Fragment>
  );
};

export default graphql(placeorderMutation, {
  name: 'placeorderMutation',
})(Placeorder);
