const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {
  Customer, Restaurant, Dish, Comment, Order,
} = require('../mongodb');

const saltRounds = 10;
const err = (msg) => ({ err: msg });
const expiresIn = 1008000;
const signPayload = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

module.exports = {
  getSession: (token) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return null;
    }
    return jwt.decode(token);
  },
  currentCustomer: async (id) => {
    return Customer.findById(id)
      .populate(
        { path: 'orders',
          populate: {
            path: 'dish',
          } },
      );
  },
  createCustomer: async (customer) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(customer.password, saltRounds, async (e, password) => {
        const cust = new Customer({ ...customer, password });
        try {
          const user = await cust.save();
          const payload = { user, scope: 'customer' };
          const token = signPayload(payload);
          resolve(token);
        } catch (e) {
          if (e.code === 11000) {
            reject('Email id is already taken');
          } else {
            throw (e);
          }
        }
      });
    });
  },
  updateCustomerProfile: async (id, profile) => {
    const customer = await Customer.findById(id);
    Object.assign(customer, profile);
    await customer.save();
    return true;
  },
  createRestaurant: async (restaurant) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(restaurant.password, saltRounds, async (e, password) => {
        const rest = new Restaurant({ ...restaurant, password });
        try {
          const user = await rest.save();
          const payload = { user, scope: 'restaurant' };
          const token = signPayload(payload);
          resolve(token);
        } catch (e) {
          if (e.code === 11000) {
            reject('Email id is already taken');
          } else {
            throw (e);
          }
        }
      });
    });
  },
  currentRestaurant: async (id) => {
    return Restaurant.findById(id)
      .populate('dishes')
      .populate({ path: 'orders',
        populate: [
          { path: 'dish' },
          { path: 'customer' },
        ] });
  },
  updateRestaurantProfile: async (id, profile) => {
    const restaurant = await Restaurant.findById(id);
    Object.assign(restaurant, profile);
    await restaurant.save();
    return true;
  },
  createDish: async (restaurantId, newDish) => {
    const dish = new Dish({ restaurant: restaurantId, ...newDish });
    const d = await dish.save();
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.dishes.push(d.id);
    await restaurant.save();
    return true;
  },
  updateDish: async (restaurantId, dishId, updateDish) => {
    const dish = await Dish.findOne({ restaurant: restaurantId, _id: dishId });
    Object.assign(dish, updateDish);
    await dish.save();
    return true;
  },
  getRestaurants: async (search) => {
    // TODO
    // const restaurant = await Restaurant.find({ name: { $regex: search, $options: 'i' } })
    // resp.json(restaurant);

    return Restaurant.aggregate([
      { $lookup: {
        from: 'dishes', localField: 'dishes', foreignField: '_id', as: 'dishes',
      } },
      {
        $match: {
          $or: [
            { location: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } },
            { 'dishes.name': { $regex: search, $options: 'i' } },
          ],
        },
      },
      { $addFields: { id: '$_id' } },
      { $project: { password: 0, _id: 0 } },
    ]);
  },
  getRestaurant: async (id) => {
    return Restaurant.findById(id)
      .populate('dishes');
  },
  placeOrder: async (customerId, dishId, isPickup) => {
    const order = new Order({
      isPickup,
      status: 'new',
      dish: dishId,
      customer: customerId,
    });

    const o = await order.save();
    const customer = await Customer.findById(customerId);
    const dish = await Dish.findById(dishId);
    // TODO parallelize
    const restaurant = await Restaurant.findById(dish.restaurant);
    restaurant.orders.push(o.id);
    restaurant.save();
    customer.orders.push(o.id);
    customer.save();
    return true;
  },
  myOrders: async (restaurantId) => {
    const dish = await Dish.find({ restaurant: restaurantId });
    return Order.find({
      dish: {
        $in: dish.map((d) => mongoose.Types.ObjectId(d._id)),
      },
    })
      .populate('dish')
      .populate('customer');
  },
  updateOrder: async (restaurantId, orderId, status) => {
    const order = await Order.findOne({ _id: orderId })
      .populate('dish');
    // Check if order belongs to restaurant
    if (order.dish.restaurant.toString() === restaurantId) {
      order.status = status;
      await order.save();
      return true;
    }
    throw ('Order not found');
  },
};
