import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getRestaurantOrdersQuery } from '../../queries/query';
import {
  updateStatusMutation,
  cancelOrderMutation,
} from '../../mutations/mutations';
import styles from './Dashboard-forms/form.module.css';
import spinner from '../layout/Spinner';

const Orders = ({
  data: { restaurantOrders },
  updateStatusMutation,
  cancelOrderMutation,
}) => {
  //   console.log(restaurantOrders);
  const [orders, setorders] = useState([]);

  useEffect(() => {
    setorders(restaurantOrders);
  }, [restaurantOrders]);

  const [status, setstatus] = useState('');
  const [success, setsuccess] = useState(false);
  const [filter, setfilter] = useState('');

  const handleStatusChange = async (e, id) => {
    e.preventDefault();

    console.log('Data here: ', status, id);
    const mutationResponse = await updateStatusMutation({
      variables: {
        id: id,
        status: status,
      },
    });

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

  const handleCancelOrder = async (e, orderId) => {
    e.preventDefault();

    console.log('Here', orderId);
    const mutationResponse = await cancelOrderMutation({
      variables: {
        id: orderId,
      },
    });

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

  const handleCustomerClick = (e, id) => {
    localStorage.setItem('Customer', id);
  };

  const handlefilters = (e) => {
    e.preventDefault();
    if (e.target.value === 'All') {
      setorders(restaurantOrders);
    } else if (e.target.value === 'New') {
      setorders(restaurantOrders.filter((each) => each.type === 'New'));
    } else if (e.target.value === 'Delivered') {
      setorders(restaurantOrders.filter((each) => each.type === 'Delivered'));
    } else if (e.target.value === 'Cancelled') {
      setorders(restaurantOrders.filter((each) => each.type === 'Cancelled'));
    }

    setfilter(e.target.value);
  };

  return !orders ? (
    spinner
  ) : (
    <Fragment>
      {success === true && <p>Order status updated.</p>}
      <div className='container'>
        <h1 className={styles.order_title}>Orders Placed by Customers</h1>

        <select
          className='select-css select-css-width select-orders'
          name='filter'
          value={filter}
          style={{ width: '200px', marginLeft: '0px' }}
          onChange={(e) => handlefilters(e)}
        >
          <option>Select Status</option>
          <option value='All'>All Orders</option>
          <option value='New'>New Order</option>
          <option value='Delivered'>Delivered Order</option>
          <option value='Cancelled'>Cancelled Order</option>
        </select>

        <hr />

        {orders.map((order) => {
          return (
            <Fragment>
              <div className='tile is-ancestor'>
                <div className='tile is-parent is-5'>
                  <article className='tile is-child box has-background-link-light'>
                    <span className='title is-5 has-text-black'>
                      Order placed by{' '}
                      <Link
                        className={styles.display_name}
                        to={`/customer/details`}
                        onClick={(e) => handleCustomerClick(e, order.customer)}
                      >
                        {order.customerName}
                      </Link>
                    </span>
                    <p className='title is-4 has-text-black'>{order.item}</p>
                    <p className='title is-5 has-text-danger-dark'>
                      Delivery Option: {order.deliveryOption}
                    </p>
                    <p className='title is-5 has-text-danger-dark'>
                      Current Delivery Status: {order.status}
                    </p>
                    {order.type && (
                      <p className='title is-5 has-text-black'>
                        {order.type === 'Completed' && (
                          <i className='fas fa-check'></i>
                        )}{' '}
                        {order.type === 'New' && (
                          <i className='fas fa-plus'></i>
                        )}{' '}
                        {order.type === 'Cancelled' && (
                          <i className='fas fa-times'></i>
                        )}{' '}
                        {order.type} Order
                      </p>
                    )}
                    <Fragment>
                      <select
                        className='select-css select-css-width select-orders'
                        name='status'
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                      >
                        <option>Select Status</option>
                        <option value='Received'>Order Recieved</option>
                        <option value='Preparing'>Preparing</option>
                        {order.deliveryOption === 'Pickup' ? (
                          <Fragment>
                            <option value='Pick up ready'>Pick Up Ready</option>
                            <option value='Pickedup'>Picked Up</option>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <option value='On the way'>On the Way</option>
                            <option value='Delivered'>Delivered</option>
                          </Fragment>
                        )}
                      </select>
                      <br />
                      <button
                        className={styles.submit_btn}
                        onClick={(e) => handleStatusChange(e, order.id)}
                      >
                        Update Status
                      </button>
                      {'  '}
                      <button
                        className={styles.submit_btn}
                        onClick={(e) => handleCancelOrder(e, order.id)}
                      >
                        Cancel Order
                      </button>
                      <p className='date-order'>
                        Order placed on: {order.date.substring(0, 10)}
                      </p>
                    </Fragment>
                  </article>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default compose(
  graphql(getRestaurantOrdersQuery, {
    options: {
      variables: { restaurantId: localStorage.getItem('user') },
    },
  }),
  graphql(updateStatusMutation, { name: 'updateStatusMutation' }),
  graphql(cancelOrderMutation, { name: 'cancelOrderMutation' }),
)(Orders);
