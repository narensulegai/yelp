const { DataTypes } = require('sequelize');
const { merge } = require('lodash');

const stringType = () => ({
  type: DataTypes.STRING,
  allowNull: true,
});

const intType = () => ({
  type: DataTypes.INTEGER,
  allowNull: true,
});

const customer = {
  modelName: 'customer',
  attributes: {
    name: stringType(),
    email: { ...stringType(), unique: true },
    password: stringType(),
    yelpingSince: stringType(),
    thingsILove: stringType(),
    website: stringType(),
    about: stringType(),
  },
  options: {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
};

const restaurant = {
  modelName: 'restaurant',
  attributes: {
    name: stringType(),
    email: { ...stringType(), unique: true },
    password: stringType(),
    location: stringType(),
    description: stringType(),
    contactInformation: stringType(),
    timings: stringType(),
  },
  options: {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
};

const image = {
  modelName: 'image',
  attributes: {
    fileId: stringType(),
    scope: stringType(),
    type: stringType(),
    typeId: intType(),
    userId: intType(),
  },
};

const dish = {
  modelName: 'dish',
  attributes: {
    restaurantId: intType(),
    name: stringType(),
    ingredients: stringType(),
    price: stringType(),
    description: stringType(),
    dishCategory: intType(),
  },
};

const event = {
  modelName: 'event',
  attributes: {
    name: stringType(),
    restaurantId: intType(),
    description: stringType(),
    location: stringType(),
    hashTags: stringType(),
    date: stringType(),
    time: stringType(),
  },
};

const customerEvent = {
  modelName: 'customerEvent',
  attributes: {
    eventId: intType(),
    customerId: stringType(),
  },
};

const comment = {
  modelName: 'comment',
  attributes: {
    restaurantId: intType(),
    customerId: intType(),
    text: stringType(),
    rating: intType(),
  },
};
const models = [
  customer, restaurant, image, dish, event, customerEvent, comment,
];

module.exports = models.map((m) => merge({
  options: {
    freezeTableName: true,
    timestamps: false,
  },
}, m));
