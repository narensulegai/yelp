const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);
const handler = require('./handlers');
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

[
  ['put', '/api/login/:user', handler.login, null],
  ['put', '/api/logout', handler.logout, null],
  ['get', '/api/currentUser', handler.current, null],
  ['post', '/api/signup/customer', handler.signupCustomer, null, schema.signupCustomer],
  ['post', '/api/signup/restaurant', handler.signupRestaurant, null, schema.signupRestaurant],
  ['post', '/api/uploadFile', handler.uploadFile, null],
  ['post', '/api/images', handler.addImages, null],
  ['get', '/api/images', handler.getImages, null],
  ['delete', '/api/image/:id', handler.deleteImage, null],
  ['get', '/api/file/:id', handler.getFile, null],
  ['put', '/api/profile/restaurant', handler.updateRestaurantProfile, null, schema.updateRestaurantProfile],
  ['get', '/api/profile/restaurant', handler.getRestaurantProfile, null],
  ['put', '/api/profile/customer', handler.updateCustomerProfile, null, schema.updateCustomerProfile],
  ['get', '/api/profile/customer', handler.getCustomerProfile, null],
  ['get', '/api/dishes', handler.getDishes, null],
  ['post', '/api/dish', handler.createDish, null, schema.createDish],
  ['put', '/api/dish/:id', handler.updateDish, null, schema.createDish],
  ['delete', '/api/dish/:id', handler.deleteDish, null],
  ['post', '/api/event', handler.createEvent, null, schema.createEvent],
  ['delete', '/api/event/:id', handler.deleteEvent, null],
  ['get', '/api/restaurant/events', handler.getRestaurantEvents, null],
  ['get', '/api/events', handler.getEvents, null],
  ['get', '/api/customer/events', handler.getCustomerEvents, null],
  ['post', '/api/registerEvent/:id', handler.registerEvent, null],
  ['get', '/api/restaurants', handler.getRestaurants, null],
  ['get', '/api/comments/:id', handler.getComments, null],
  ['post', '/api/comment/:id', handler.addComment, null, schema.addComment],
  ['get', '/api/restaurant/dishes/:id', handler.getRestaurantDishes, null],
  ['post', '/api/placeOrder/:id', handler.placeOrder, null],
  ['get', '/api/myOrders', handler.myOrders, null],
  ['put', '/api/myOrder/:id', handler.updateMyOrder, null],
].forEach((r) => {
  app[r[0]](r[1], (req, resp, next) => {
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

app.listen(5000);
