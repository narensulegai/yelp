const mongoose = require('mongoose');

const {
  Schema: Types,
} = mongoose;

module.exports = {
  Customer: {
    model: {
      fileId: { type: String },
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      yelpingSince: { type: String, default: '' },
      thingsILove: { type: String, default: '' },
      website: { type: String, default: '' },
      about: { type: String, default: '' },
      conversations: [{ type: Types.ObjectId, ref: 'Restaurant', required: true }],
      following: [{ type: Types.ObjectId, ref: 'Customer', required: true }],
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Restaurant: {
    model: {
      fileIds: [{ type: String }],
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      location: { type: String, default: '' },
      description: { type: String, default: '' },
      contactInformation: { type: String, default: '' },
      timings: { type: String, default: '' },
      dishes: [{ type: Types.ObjectId, ref: 'Dish', required: true }],
      events: [{ type: Types.ObjectId, ref: 'Event', required: true }],
      conversations: [{ type: Types.ObjectId, ref: 'Restaurant', required: true }],
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Event: {
    model: {
      name: { type: String, required: true },
      description: { type: String, default: '' },
      location: { type: String, default: '' },
      hashTags: { type: String, default: '' },
      date: { type: String, default: '' },
      time: { type: String, default: '' },
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      Registration: {
        model: {
          customer: { type: Types.ObjectId, ref: 'Customer', required: true },
        },
      },
    },
  },
  Dish: {
    model: {
      fileIds: [{ type: String }],
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
  Image: {
    model: {
      fileId: { type: String, required: true },
      scope: { type: String, required: true },
      type: { type: String, required: true },
      typeId: { type: String, default: null },
      userId: { type: Types.ObjectId, default: null },
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
  Message: {
    model: {
      customer: { type: Types.ObjectId, ref: 'Customer', required: true },
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      text: { type: String, required: true },
      fromRestaurant: { type: Boolean, default: true },
    },
  },
};
