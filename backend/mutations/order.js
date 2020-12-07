const Order = require('../models/OrderModel');

const placeOrder = async (args) => {
  const {
    item,
    deliveryOption,
    restaurantId,
    customerId,
    customerName,
    restaurantName,
  } = args;

  const order = new Order({
    restaurant: restaurantId,
    customer: customerId,
    customerName,
    restaurantName,
    item,
    deliveryOption,
    status: 'New',
  });

  const savedOrder = await order.save();
  if (savedOrder) {
    return { status: 200, message: 'ORDER_PLACED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const updateOrder = async (args) => {
  const { id, status } = args;
  let orderType = '';
  if (status === 'Pickedup' || status === 'Delivered') {
    orderType = 'Completed';
  }
  const order = await Order.findById(id);
  order.status = status;
  order.type = orderType;
  const savedOrder = await order.save();
  if (savedOrder) {
    return { status: 200, message: 'ORDER_UPDATED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const cancelOrder = async (args) => {
  const { id } = args;
  const order = await Order.findById(id);
  order.status = 'Cancelled';
  order.type = 'Cancelled';
  const savedOrder = await order.save();
  if (savedOrder) {
    return { status: 200, message: 'ORDER_CANCELLED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

exports.placeOrder = placeOrder;
exports.updateOrder = updateOrder;
exports.cancelOrder = cancelOrder;
