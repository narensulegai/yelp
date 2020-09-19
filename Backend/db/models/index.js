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
  modelName: 'Customer',
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
  modelName: 'Restaurant',
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
  modelName: 'Image',
  attributes: {
    fileId: stringType(),
    scope: stringType(),
    type: stringType(),
    typeId: intType(),
    userId: intType(),
  },
};

const dish = {
  modelName: 'Dish',
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
  modelName: 'Event',
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
const models = [
  customer, restaurant, image, dish, event,
];

module.exports = models.map((m) => merge({
  options: {
    freezeTableName: true,
    timestamps: false,
  },
}, m));
