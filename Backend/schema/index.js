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
const reqNum = (label) => Joi.number().required().label(label);
const optStr = (label) => Joi.string().allow('').label(label);
const optFiles = () => Joi.array().items(Joi.string()).label('Files');
const schema = {
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
    fileIds: optFiles(),
    description: optStr('Description'),
    contactInformation: optStr('Contact information'),
    timings: optStr('Timings'),
  }),
  updateCustomerProfile: Joi.object({
    fileId: optStr('File'),
    yelpingSince: optStr('Yelping Since'),
    thingsILove: optStr('Things I love'),
    website: optStr('Website'),
    about: optStr('About'),
  }),
  createDish: Joi.object({
    fileIds: optFiles(),
    name: reqStr('Name'),
    ingredients: reqStr('Ingredients'),
    price: reqStr('Price'),
    description: reqStr('Description'),
    dishCategory: reqNum('Category'),
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
    text: reqStr('Review'),
    rating: reqNum('Rating'),
  }),
};

module.exports = { schema, validate };
