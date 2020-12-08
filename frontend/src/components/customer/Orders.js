import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getCustomerOrdersQuery } from '../../queries/query';
import styles from '../restaurant/Dashboard-forms/form.module.css';
import spinner from '../layout/Spinner';

const Orders = ({ data: { customerOrders } }) => {
  //   console.log(customerOrders);
  const [orders, setorders] = useState([]);

  useEffect(() => {
    setorders(customerOrders);
  }, [customerOrders]);

  const [filter, setfilter] = useState('');
  const [date, setdate] = useState('');

  //   const handleCustomerClick = (e, id) => {
  //     localStorage.setItem('Customer', id);
  //   };

  const handlefilters = (e) => {
    e.preventDefault();
    if (e.target.value === 'All') {
      setorders(customerOrders);
    } else if (e.target.value === 'Received') {
      setorders(customerOrders.filter((each) => each.status === 'Received'));
    } else if (e.target.value === 'Preparing') {
      setorders(customerOrders.filter((each) => each.status === 'Preparing'));
    } else if (e.target.value === 'ontheway') {
      setorders(
        customerOrders.filter(
          (each) =>
            each.status === 'On the way' || each.status === 'Pick up ready',
        ),
      );
    } else if (e.target.value === 'Delivered') {
      setorders(
        customerOrders.filter(
          (each) => each.status === 'Delivered' || each.status === 'Pickedup',
        ),
      );
    }

    setfilter(e.target.value);
  };

  const handleDateFilter = (e) => {
    e.preventDefault();
    if (e.target.value === 'Ascending') {
      setorders(customerOrders.reverse());
    } else {
      setorders(customerOrders.reverse());
    }
    setdate('Ascending');
  };

  return !orders ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.order_title}>Orders placed by customers</h1>

        <div style={{ display: 'flex' }}>
          <select
            className='select-css select-css-width select-orders'
            style={{ width: '200px' }}
            name='filter'
            value={filter}
            onChange={(e) => handlefilters(e)}
          >
            <option>Filter by Status</option>
            <option value='All'>All Orders</option>
            <option value='Received'>Received</option>
            <option value='Preparing'>Preparing</option>
            <option value='ontheway'>On the way / Pick up ready</option>
            <option value='Delivered'>Delivered / Pickedup</option>
          </select>

          <select
            className='select-css select-css-width select-orders'
            style={{ marginLeft: '3%', width: '200px' }}
            name='date'
            value={date}
            onChange={(e) => handleDateFilter(e)}
          >
            <option>Order By Date</option>
            <option value='Ascending'>Ascending</option>
            <option value='Descending'>Descending</option>
          </select>
        </div>
        <hr />

        {orders.map((order) => {
          return (
            <Fragment>
              <div className='tile is-ancestor'>
                <div className='tile is-parent is-5'>
                  <article className='tile is-child box has-background-link-light'>
                    <span className='title is-5 has-text-black'>
                      Order at{' '}
                      <Link className={styles.display_name}>
                        {order.restaurantName}
                      </Link>
                    </span>
                    <p className='title is-4 has-text-black'>{order.item}</p>
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
  graphql(getCustomerOrdersQuery, {
    options: {
      variables: { customerId: localStorage.getItem('user') },
    },
  }),
)(Orders);
