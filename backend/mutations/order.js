const Order = require('../models/OrderModel');

const placeOrder = async (args) => {
  const { item, deliveryOption, restaurantId, customerId } = args;

  const order = new Order({
    restaurant: restaurantId,
    customer: customerId,
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

exports.placeOrder = placeOrder;
