const mongoose = require('mongoose');

const {
  Schema: Types,
} = mongoose;

module.exports = {
  Customer: {
    model: {
      name: { type: String, required: true },
      email: { type: String, required: true, index: { unique: true } },
      password: { type: String, required: true },
      yelpingSince: { type: String, default: '' },
      thingsILove: { type: String, default: '' },
      website: { type: String, default: '' },
      about: { type: String, default: '' },
      orders: [{ type: Types.ObjectId, ref: 'Order', required: true }],
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Restaurant: {
    model: {
      name: { type: String, required: true },
      email: { type: String, required: true, index: { unique: true } },
      password: { type: String, required: true },
      location: { type: String, default: '' },
      description: { type: String, default: '' },
      contactInformation: { type: String, default: '' },
      timings: { type: String, default: '' },
      dishes: [{ type: Types.ObjectId, ref: 'Dish', required: true }],
      orders: [{ type: Types.ObjectId, ref: 'Order', required: true }],
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Dish: {
    model: {
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      name: { type: String, required: true },
      ingredients: { type: String, default: '' },
      price: { type: String, default: '' },
      description: { type: String, default: '' },
      dishCategory: { type: Number, default: null },
    },
  },
  Order: {
    model: {
      customer: { type: Types.ObjectId, ref: 'Customer', required: true },
      dish: { type: Types.ObjectId, ref: 'Dish', required: true },
      isCanceled: { type: Boolean, default: false },
      isPickup: { type: Boolean, default: true },
      status: { type: String, required: true },
    },
  },
  Comment: {
    model: {
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      dish: { type: Types.ObjectId, ref: 'Dish', required: true },
      customer: { type: Types.ObjectId, ref: 'Customer', required: true },
      text: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  },
};
