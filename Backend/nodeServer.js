require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoHandler = require('./mongoHandlers');
const { schema, validate } = require('./schema');
const { kafka } = require('./kafka');
const modules = require('./modules');

let callAndWait = () => {
  console.log('Kafka client has not connected yet, message will be lost');
};

(async () => {
  if (process.env.MOCK_KAFKA !== 'true') {
    const k = await kafka();
    callAndWait = k.callAndWait;
  } else {
    callAndWait = async (fn, ...params) => modules[fn](...params);
    console.log('Connected to dev kafka');
  }
})();

const err = (msg) => ({ err: msg });
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));

[
  ['put', '/apiV1/login/:user', mongoHandler.login, null],
  ['get', '/apiV1/currentUser', mongoHandler.current, null],
  ['post', '/apiV1/signup/customer', mongoHandler.signupCustomer, null, schema.signupCustomer],
  ['post', '/apiV1/signup/restaurant', mongoHandler.signupRestaurant, null, schema.signupRestaurant],
  ['post', '/apiV1/file', mongoHandler.uploadFile, null],
  ['get', '/apiV1/file/:id', mongoHandler.getFile, null],
  ['put', '/apiV1/profile/restaurant', mongoHandler.updateRestaurantProfile, 'restaurant', schema.updateRestaurantProfile],
  ['put', '/apiV1/profile/customer', mongoHandler.updateCustomerProfile, 'customer', schema.updateCustomerProfile],
  ['get', '/apiV1/dishes', mongoHandler.getDishes, 'restaurant'],
  ['post', '/apiV1/dish', mongoHandler.createDish, 'restaurant', schema.createDish],
  ['put', '/apiV1/dish/:id', mongoHandler.updateDish, 'restaurant', schema.createDish],
  ['delete', '/apiV1/dish/:id', mongoHandler.deleteDish, 'restaurant'],
  ['post', '/apiV1/event', mongoHandler.createEvent, 'restaurant', schema.createEvent],
  ['delete', '/apiV1/event/:id', mongoHandler.deleteEvent, 'restaurant'],
  ['get', '/apiV1/restaurant/events', mongoHandler.getRestaurantEvents, 'restaurant'],
  ['get', '/apiV1/events', mongoHandler.getUnregisteredEvents, 'customer'],
  ['get', '/apiV1/customer/events', mongoHandler.getCustomerEvents, 'customer'],
  ['post', '/apiV1/registerEvent/:id', mongoHandler.registerEvent, 'customer'],
  ['get', '/apiV1/restaurants', mongoHandler.getRestaurants, null],
  ['get', '/apiV1/comments/:id', mongoHandler.getComments, null],
  ['post', '/apiV1/comment/:id', mongoHandler.addComment, 'customer', schema.addComment],
  ['get', '/apiV1/restaurant/comments', mongoHandler.getRestaurantComments, 'restaurant', null],
  ['get', '/apiV1/restaurant/dishes/:id', mongoHandler.getRestaurantDishes, null],
  ['post', '/apiV1/placeOrder/:id', mongoHandler.placeOrder, 'customer'],
  ['get', '/apiV1/myOrders', mongoHandler.myOrders, 'any'],
  ['put', '/apiV1/myOrder/:id', mongoHandler.updateMyOrder, 'any'],
  ['get', '/apiV1/customer/:id', mongoHandler.getCustomer, null],
  ['post', '/apiV1/message/:id', mongoHandler.sendMessageTo, 'any'],
  ['get', '/apiV1/messages/:id', mongoHandler.getMessagesFrom, 'any'],
  ['put', '/apiV1/follow/:id', mongoHandler.follow, 'customer'],
  ['get', '/apiV1/customers', mongoHandler.customers, 'customer'],
  ['get', '/apiV1/following', mongoHandler.following, 'customer'],
].forEach((r) => {
  app[r[0]](r[1], (req, resp, next) => {
    // console.log(req.url, r[2].name);
    const token = req.header('authorization');
    req.session = {};
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        return resp.status(401).json(err('You need to login, your session has expired'));
      }
      req.session = jwt.decode(token);
    }

    if (r[3] === 'company' || r[3] === 'employee') {
      const { scope } = req.session;
      if (scope !== r[3]) {
        return resp.status(401).json(err('You are not authorized for this action.'));
      }
    }
    if (r[3] === 'any') {
      const { scope } = req.session;
      if (!scope) {
        return resp.status(401).json(err('You need to login.'));
      }
    }
    if (r[4]) {
      const { error } = validate(req.body, r[4]);
      if (error) {
        const messages = error.details.map((d) => d.message);
        return resp.status(400).json(err(messages[0]));
      }
      req.requestKafka = callAndWait;
      next();
    } else {
      req.requestKafka = callAndWait;
      next();
    }
  }, async (req, res, next) => {
    try {
      await r[2](req, res, next);
    } catch (e) {
      next(e);
    }
  });
});

app.listen(parseInt(process.env.PORT));
module.exports = app; // used by mocha tests
