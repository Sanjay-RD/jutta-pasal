import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create new Order
// @route   POST /api/orders
// access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Item");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get Order By ID
// @route   GET /api/orders/:id
// access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error(`order with id:${req.params.id} is not found`);
  }
});

// @desc    Update Order to Pay
// @route   PUT /api/orders/:id/pay
// access   Private
const updateOrderToPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error(`order with id:${req.params.id} is not found`);
  }
});

// @desc    Update Order to Delivered
// @route   PUT /api/orders/:id/deliver
// access   Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error(`order with id:${req.params.id} is not found`);
  }
});

// @desc    Get my Orders
// @route   GET /api/orders/myorders
// access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc    Get Orders
// @route   GET /api/orders
// access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPay,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
