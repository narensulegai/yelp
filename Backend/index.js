const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const handler = require('./handlers');
const mongoHandler = require('./mongoHandlers');
const schema = require('./schema');

const err = (msg) => ({ err: msg });
const app = express();
app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

[
  ['put', '/api/login/:user', handler.login, null],
  ['put', '/mongo/login/:user', mongoHandler.login, null],
  ['put', '/api/logout', handler.logout, 'any'],
  ['put', '/mongo/logout', handler.logout, 'any'],
  ['get', '/api/currentUser', handler.current, null],
  ['get', '/mongo/currentUser', handler.current, null],
  ['post', '/api/signup/customer', handler.signupCustomer, null, schema.signupCustomer],
  ['post', '/mongo/signup/customer', mongoHandler.signupCustomer, null, schema.signupCustomer],
  ['post', '/api/signup/restaurant', handler.signupRestaurant, null, schema.signupRestaurant],
  ['post', '/api/uploadFile', handler.uploadFile, null],
  ['post', '/mongo/uploadFile', handler.uploadFile, null],
  ['post', '/api/images', handler.addImages, 'any'],
  ['post', '/mongo/images', mongoHandler.addImages, 'any'],
  ['get', '/api/images', handler.getImages, 'any'],
  ['get', '/mongo/images', mongoHandler.getImages, 'any'],
  ['delete', '/api/image/:id', handler.deleteImage, 'any'],
  ['delete', '/mongo/image/:id', mongoHandler.deleteImage, 'any'],
  ['get', '/api/file/:id', handler.getFile, 'any'],
  ['get', '/mongo/file/:id', mongoHandler.getFile, 'any'],
  ['put', '/api/profile/restaurant', handler.updateRestaurantProfile, 'restaurant', schema.updateRestaurantProfile],
  ['get', '/api/profile/restaurant', handler.getRestaurantProfile, 'restaurant'],
  ['put', '/api/profile/customer', handler.updateCustomerProfile, 'customer', schema.updateCustomerProfile],
  ['get', '/api/profile/customer', handler.getCustomerProfile, 'customer'],
  ['get', '/mongo/profile/customer', mongoHandler.getCustomerProfile, 'customer'],
  ['get', '/api/dishes', handler.getDishes, 'restaurant'],
  ['post', '/api/dish', handler.createDish, 'restaurant', schema.createDish],
  ['put', '/api/dish/:id', handler.updateDish, 'restaurant', schema.createDish],
  ['delete', '/api/dish/:id', handler.deleteDish, 'restaurant'],
  ['post', '/api/event', handler.createEvent, 'restaurant', schema.createEvent],
  ['delete', '/api/event/:id', handler.deleteEvent, 'restaurant'],
  ['get', '/api/restaurant/events', handler.getRestaurantEvents, 'restaurant'],
  ['get', '/api/events', handler.getEvents, 'customer'],
  ['get', '/api/customer/events', handler.getCustomerEvents, 'customer'],
  ['post', '/api/registerEvent/:id', handler.registerEvent, 'customer'],
  ['get', '/api/restaurants', handler.getRestaurants, null],
  ['get', '/api/comments/:id', handler.getComments, 'any'],
  ['post', '/api/comment/:id', handler.addComment, 'customer', schema.addComment],
  ['post', '/mongo/comment/:id', mongoHandler.addComment, 'customer', schema.addComment],
  ['get', '/api/restaurant/dishes/:id', handler.getRestaurantDishes, null],
  ['post', '/api/placeOrder/:id', handler.placeOrder, 'customer'],
  ['get', '/api/myOrders', handler.myOrders, 'any'],
  ['put', '/api/myOrder/:id', handler.updateMyOrder, 'any'],
  ['get', '/api/customer/:id', handler.getCustomer, null],
  ['get', '/api/searchEvent/:text', handler.searchEvent, null],
].forEach((r) => {
  app[r[0]](r[1], (req, resp, next) => {
    if (r[3] === 'restaurant' || r[3] === 'customer') {
      const { scope } = req.session;
      if (scope !== r[3]) {
        resp.status(401).json(err('You are not authorized for this action.'));
      }
    }
    if (r[3] === 'any') {
      const { scope } = req.session;
      if (!scope) {
        resp.status(401).json(err('You need to login.'));
      }
    }
    if (r[4]) {
      const { error } = r[4](req.body);
      if (error) {
        const messages = error.details.map((d) => d.message);
        resp.status(400).json(err(messages[0]));
      } else {
        next();
      }
    } else {
      next();
    }
  }, r[2]);
});

app.listen(parseInt(process.env.PORT || '5000'));
module.exports = app; // used by mocha tests
