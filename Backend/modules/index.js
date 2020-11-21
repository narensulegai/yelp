const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {
  Customer, Restaurant, Dish, Comment, Event, Order, Message,
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
    return Customer.findById(id);
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
    return Restaurant.findById(id);
  },
  sendMessageTo: async (msg) => {
    const message = new Message(msg);
    return message.save();
  },
  updateRestaurantProfile: async (id, profile) => {
    const restaurant = await Restaurant.findById(id);
    Object.assign(restaurant, profile);
    await restaurant.save();
    return true;
  },
  getMessagesFrom: async (customer, restaurant) => Message.find({ customer, restaurant }).sort({ createdAt: 'desc' }),
};
