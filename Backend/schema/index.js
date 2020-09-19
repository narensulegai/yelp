const Joi = require('joi');

const validate = (body, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: false, // remove unknown props
  };
  return schema.validate(body, options);
};

const reqStr = (label) => Joi.string().required().label(label);
const optStr = (label) => Joi.string().allow('').label(label);

const schemaDef = {
  signupCustomer: Joi.object({
    name: reqStr('Name'),
    email: Joi.string().email().required().label('Email'),
    password: reqStr('Password'),
  }),
  signupRestaurant: Joi.object({
    name: reqStr('Name'),
    email: Joi.string().email().required().label('Email'),
    password: reqStr('Password'),
    location: reqStr('Location'),
  }),
  updateRestaurantProfile: Joi.object({
    name: reqStr('Name'),
    location: reqStr('Location'),
    description: reqStr('Description'),
    contactInformation: reqStr('Contact information'),
    timings: reqStr('Timings'),
  }),
  updateCustomerProfile: Joi.object({
    name: reqStr('Name'),
    yelpingSince: optStr('Yelping Since'),
    thingsILove: optStr('Things I love'),
    website: optStr('Website'),
    about: optStr('About'),
  }),
  createDish: Joi.object({
    name: reqStr('Name'),
    ingredients: reqStr('Ingredients'),
    price: reqStr('Price'),
    description: reqStr('Description'),
    dishCategory: Joi.number().required(),
  }),
  createEvent: Joi.object({
    name: reqStr('Name'),
    description: reqStr('Description'),
    location: reqStr('Location'),
    hashTags: optStr('Hash tags'),
    date: reqStr('Date'),
    time: reqStr('Time'),
  }),
  addComment: Joi.object({
    text: reqStr('Comment'),
    rating: reqStr('Rating'),
  }),
};
const schema = {};
for (const k in schemaDef) {
  schema[k] = (body) => validate(body, schemaDef[k]);
}

module.exports = schema;
