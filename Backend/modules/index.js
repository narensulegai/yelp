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

  sendMessageTo: async (msg) => {
    const message = new Message(msg);
    return message.save();
  },
  getMessagesFrom: async (customer, restaurant) => Message.find({ customer, restaurant }).sort({ createdAt: 'desc' }),
};
