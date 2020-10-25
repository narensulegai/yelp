const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const handler = require('./handlers');
const mongoHandler = require('./mongoHandlers');
const schema = require('./schema');
require('dotenv').config();
const { kafka, topics } = require('./kafka');

let kafkaMessage = () => {
  console.error('Kafka client has not connected yet, message will be lost');
};

(async () => {
  const { subscribe, send } = await kafka();
  console.log('Connected to kafka');
  kafkaMessage = send;
  subscribe(topics.MESSAGES, async (msg, t) => {
    await mongoHandler.saveMessage(msg);
  });
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
  ['put', '/api/login/:user', handler.login, null],
  ['put', '/apiV1/login/:user', mongoHandler.login, null],
  ['get', '/api/currentUser', handler.current, null],
  ['get', '/apiV1/currentUser', handler.current, null],
  ['post', '/api/signup/customer', handler.signupCustomer, null, schema.signupCustomer],
  ['post', '/apiV1/signup/customer', mongoHandler.signupCustomer, null, schema.signupCustomer],
  ['post', '/api/signup/restaurant', handler.signupRestaurant, null, schema.signupRestaurant],
  ['post', '/apiV1/signup/restaurant', mongoHandler.signupRestaurant, null, schema.signupRestaurant],
  ['post', '/api/uploadFile', handler.uploadFile, null],
  ['post', '/apiV1/uploadFile', handler.uploadFile, null],
  ['post', '/api/images', handler.addImages, 'any'],
  ['post', '/apiV1/images', mongoHandler.addImages, 'any'],
  ['get', '/api/images', handler.getImages, 'any'],
  ['get', '/apiV1/images', mongoHandler.getImages, 'any'],
  ['delete', '/api/image/:id', handler.deleteImage, 'any'],
  ['delete', '/apiV1/image/:id', mongoHandler.deleteImage, 'any'],
  ['get', '/api/file/:id', handler.getFile, null],
  ['get', '/apiV1/file/:id', mongoHandler.getFile, null],
  ['put', '/api/profile/restaurant', handler.updateRestaurantProfile, 'restaurant', schema.updateRestaurantProfile],
  ['put', '/apiV1/profile/restaurant', mongoHandler.updateRestaurantProfile, 'restaurant', schema.updateRestaurantProfile],
  ['get', '/api/profile/restaurant', handler.getRestaurantProfile, 'restaurant'],
  ['get', '/apiV1/profile/restaurant', mongoHandler.getRestaurantProfile, 'restaurant'],
  ['put', '/api/profile/customer', handler.updateCustomerProfile, 'customer', schema.updateCustomerProfile],
  ['put', '/apiV1/profile/customer', mongoHandler.updateCustomerProfile, 'customer', schema.updateCustomerProfile],
  ['get', '/api/profile/customer', handler.getCustomerProfile, 'customer'],
  ['get', '/apiV1/profile/customer', mongoHandler.getCustomerProfile, 'customer'],
  ['get', '/api/dishes', handler.getDishes, 'restaurant'],
  ['get', '/apiV1/dishes', mongoHandler.getDishes, 'restaurant'],
  ['post', '/api/dish', handler.createDish, 'restaurant', schema.createDish],
  ['post', '/apiV1/dish', mongoHandler.createDish, 'restaurant', schema.createDish],
  ['put', '/api/dish/:id', handler.updateDish, 'restaurant', schema.createDish],
  ['put', '/apiV1/dish/:id', mongoHandler.updateDish, 'restaurant', schema.createDish],
  ['delete', '/api/dish/:id', handler.deleteDish, 'restaurant'],
  ['delete', '/apiV1/dish/:id', mongoHandler.deleteDish, 'restaurant'],
  ['post', '/api/event', handler.createEvent, 'restaurant', schema.createEvent],
  ['post', '/apiV1/event', mongoHandler.createEvent, 'restaurant', schema.createEvent],
  ['delete', '/api/event/:id', handler.deleteEvent, 'restaurant'],
  ['delete', '/apiV1/event/:id', mongoHandler.deleteEvent, 'restaurant'],
  ['get', '/api/restaurant/events', handler.getRestaurantEvents, 'restaurant'],
  ['get', '/apiV1/restaurant/events', mongoHandler.getRestaurantEvents, 'restaurant'],
  ['get', '/api/events', handler.getEvents, 'customer'],
  ['get', '/apiV1/events', mongoHandler.getUnregisteredEvents, 'customer'],
  ['get', '/api/customer/events', handler.getCustomerEvents, 'customer'],
  ['get', '/apiV1/customer/events', mongoHandler.getCustomerEvents, 'customer'],
  ['post', '/api/registerEvent/:id', handler.registerEvent, 'customer'],
  ['post', '/apiV1/registerEvent/:id', mongoHandler.registerEvent, 'customer'],
  ['get', '/api/restaurants', handler.getRestaurants, null],
  ['get', '/apiV1/restaurants', mongoHandler.getRestaurants, null],
  ['get', '/api/comments/:id', handler.getComments, 'any'],
  ['get', '/apiV1/comments/:id', mongoHandler.getComments, null],
  ['post', '/api/comment/:id', handler.addComment, 'customer', schema.addComment],
  ['post', '/apiV1/comment/:id', mongoHandler.addComment, 'customer', schema.addComment],
  ['get', '/apiV1/restaurant/comments', mongoHandler.getRestaurantComments, 'restaurant', null],
  ['get', '/api/restaurant/dishes/:id', handler.getRestaurantDishes, null],
  ['get', '/apiV1/restaurant/dishes/:id', mongoHandler.getRestaurantDishes, null],
  ['post', '/api/placeOrder/:id', handler.placeOrder, 'customer'],
  ['post', '/apiV1/placeOrder/:id', mongoHandler.placeOrder, 'customer'],
  ['get', '/api/myOrders', handler.myOrders, 'any'],
  ['get', '/apiV1/myOrders', mongoHandler.myOrders, 'any'],
  ['put', '/api/myOrder/:id', handler.updateMyOrder, 'any'],
  ['put', '/apiV1/myOrder/:id', mongoHandler.updateMyOrder, 'any'],
  ['get', '/api/customer/:id', handler.getCustomer, null],
  ['get', '/apiV1/customer/:id', mongoHandler.getCustomer, null],
  ['get', '/api/searchEvent/:text', handler.searchEvent, null],
  ['get', '/apiV1/searchEvent/:text', handler.searchEvent, null],
  ['post', '/apiV1/message/:id', mongoHandler.sendMessageTo, 'any'],
  ['get', '/apiV1/messages/:id', mongoHandler.getMessagesFrom, 'any'],
].forEach((r) => {
  app[r[0]](r[1], (req, resp, next) => {
    if (r[3] !== null) {
      const token = req.header('authorization');
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        resp.status(401).json(err('You need to login.'));
      }
      const { scope, user } = jwt.decode(token);
      req.session = { scope, user };
      if (r[3] !== 'any' && scope !== r[3]) {
        resp.status(401).json(err('You are not authorized to do this.'));
      }
    }
    if (r[4]) {
      const { error } = r[4](req.body);
      if (error) {
        const messages = error.details.map((d) => d.message);
        resp.status(400).json(err(messages[0]));
      } else {
        req.kafkaMessage = kafkaMessage;
        next();
      }
    } else {
      req.kafkaMessage = kafkaMessage;
      next();
    }
  }, r[2]);
});

app.listen(parseInt(process.env.PORT || '5000'));
module.exports = app; // used by mocha tests
