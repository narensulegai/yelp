const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
  Customer, Restaurant, Dish, Comment, Event, Order, Message,
} = require('../mongodb');

const saltRounds = 10;
const err = (msg) => ({ err: msg });
const expiresIn = 1008000;

const signPayload = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

module.exports = {
  current: async (req, resp) => {
    if (req.session && req.session.scope) {
      let user = {};
      if (req.session.scope === 'customer') {
        user = await Customer.findById(req.session.user.id)
          .populate('conversations');
      }
      if (req.session.scope === 'restaurant') {
        user = await Restaurant.findById(req.session.user.id);
      }
      resp.json({ user, scope: req.session.scope });
    } else {
      resp.json({ user: null, scope: null });
    }
  },
  signupCustomer: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const customer = new Customer({ ...req.body, password });
      try {
        const user = await customer.save();
        const payload = { user, scope: 'customer' };
        const token = signPayload(payload);
        resp.json({ token, user });
      } catch (e) {
        if (e.code === 11000) {
          resp.status(400).json(err('Email id is already taken'));
        } else {
          throw (e);
        }
      }
    });
  },
  signupRestaurant: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const restaurant = new Restaurant({ ...req.body, password });
      try {
        const user = await restaurant.save();
        const payload = { user, scope: 'restaurant' };
        const token = signPayload(payload);
        resp.json({ token, user });
      } catch (e) {
        if (e.code === 11000) {
          resp.status(400).json(err('Email id is already taken'));
        } else {
          throw (e);
        }
      }
    });
  },
  updateCustomerProfile: async (req, resp) => {
    const customer = await Customer.findById(req.session.user.id);
    Object.assign(customer, req.body);
    resp.json(await customer.save());
  },
  getCustomerProfile: async (req, resp) => {
    resp.json(await Customer.findById(req.session.user.id)
      .populate('conversations'));
  },
  getCustomer: async (req, resp) => {
    resp.json(await Customer.findById(req.params.id));
  },
  login: async (req, res) => {
    const scope = req.params.user;
    // TODO check for restaurant
    const m = scope === 'customer' ? Customer : Restaurant;
    const { email, password } = req.body;
    const user = await m.findOne({ email });
    if (user === null) {
      res.status(401).json(err('Email doesn\'t exist'));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          delete user.password;
          const payload = { user, scope };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err('Email password doesn\'t match'));
        }
      });
    }
  },
  getFile: async (req, res) => {
    const fileId = req.params.id;
    // TODO check for path injection
    res.sendFile(path.join(__dirname, '../uploads', fileId));
  },
  addComment: async (req, resp) => {
    const customerId = req.session.user.id;
    const dishId = req.params.id;
    const dish = await Dish.findById(dishId);
    const comment = new Comment({
      // to get comments by restaurant
      restaurant: dish.restaurant,
      customer: customerId,
      dish: dishId,
      ...req.body,
    });
    resp.json(await comment.save());
  },
  getComments: async (req, resp) => {
    const dishId = req.params.id;
    const comment = await Comment.find({ dish: dishId })
      .populate('customer');
      // .populate('dish');
    resp.json(comment);
  },
  getRestaurantComments: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const comment = await Comment.find({ restaurant: restaurantId })
      .populate('customer')
      .populate('dish');
    resp.json(comment);
  },
  getRestaurantDishes: async (req, resp) => {
    const restaurantId = req.params.id;
    const dish = await Dish.find({ restaurant: restaurantId });
    resp.json(dish);
  },
  placeOrder: async (req, resp) => {
    const { isPickup } = req.body;
    const dishId = req.params.id;
    const customerId = req.session.user.id;
    const order = new Order({
      isPickup,
      status: 'new',
      dish: dishId,
      customer: customerId,
    });
    resp.json(await order.save());
  },
  myOrders: async (req, resp) => {
    if (req.session.scope === 'customer') {
      const customerId = req.session.user.id;
      const order = await Order.find({ customer: customerId })
        .populate('dish');
      resp.json(order);
    }
    if (req.session.scope === 'restaurant') {
      const restaurantId = req.session.user.id;
      const dish = await Dish.find({ restaurant: restaurantId });
      const order = await Order.find({
        dish: {
          $in: dish.map((d) => mongoose.Types.ObjectId(d._id)),
        },
      })
        .populate('dish')
        .populate('customer');
      resp.json(order);
    }
  },
  updateMyOrder: async (req, resp) => {
    if (req.session.scope === 'customer') {
      const customerId = req.session.user.id;
      const orderId = req.params.id;
      const order = await Order.findOne({ _id: orderId, customer: customerId });
      Object.assign(order, req.body);
      resp.json(await order.save());
    }
    if (req.session.scope === 'restaurant') {
      const restaurantId = req.session.user.id;
      const orderId = req.params.id;
      const order = await Order.findOne({ _id: orderId })
        .populate('dish');
      // Check if order belongs to restaurant
      if (order.dish.restaurant.toString() === restaurantId) {
        Object.assign(order, req.body);
        resp.json(await order.save());
      } else {
        resp.status(400).json(err('Order not found'));
      }
    }
  },
  getRestaurants: async (req, resp) => {
    // TODO
    // const { search } = req.query;
    const restaurant = await Restaurant.find()
      // .populate('events')
      .populate('dishes');
    resp.json(restaurant);
  },
  updateRestaurantProfile: async (req, resp) => {
    const restaurant = await Restaurant.findById(req.session.user.id);
    Object.assign(restaurant, req.body);
    resp.json(await restaurant.save());
  },
  getRestaurantProfile: async (req, resp) => {
    resp.json(await Restaurant.findById(req.session.user.id));
  },
  createDish: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const dish = new Dish({ restaurant: restaurantId, ...req.body });
    const newDish = await dish.save();
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.dishes.push(newDish.id);
    await restaurant.save();
    resp.json(newDish);
  },
  getDishes: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const dish = await Dish.find({ restaurant: restaurantId });
    resp.json(dish);
  },
  updateDish: async (req, resp) => {
    const restaurant = req.session.user.id;
    const dishId = req.params.id;
    const dish = await Dish.findOne({ restaurant, _id: dishId });
    Object.assign(dish, req.body);
    resp.json(await dish.save());
  },
  deleteDish: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const dishId = req.params.id;
    const deletedDish = await Dish.findOneAndDelete({ restaurant: restaurantId, _id: dishId });
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.dishes.pull(dishId);
    restaurant.save();
    resp.json(deletedDish);
  },
  getRestaurantEvents: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const event = await Event.find({ restaurant: restaurantId })
      .populate('Registration.customer');
    resp.json(event);
  },
  createEvent: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const event = new Event({ restaurant: restaurantId, ...req.body });
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.events.push(event.id);
    await restaurant.save();
    resp.json(await event.save());
  },
  deleteEvent: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const eventId = req.params.id;
    const deletedEvent = await Event.findOneAndDelete({ restaurant: restaurantId, _id: eventId });
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.events.pull(eventId);
    await restaurant.save();
    resp.json(deletedEvent);
  },
  getUnregisteredEvents: async (req, resp) => {
    const customerId = req.session.user.id;
    const events = await Event.find({ 'Registration.customer': { $ne: mongoose.Types.ObjectId(customerId) } });
    resp.json(events);
  },
  registerEvent: async (req, resp) => {
    const eventId = req.params.id;
    const customerId = req.session.user.id;
    const event = await Event.findById(eventId);
    event.Registration.push({ customer: customerId });
    resp.json(await event.save());
  },
  getCustomerEvents: async (req, resp) => {
    const customerId = req.session.user.id;
    const events = await Event.find({ 'Registration.customer': { $eq: mongoose.Types.ObjectId(customerId) } });
    resp.json(events);
  },
  // TODO make 2 apis
  sendMessageTo: async (req, resp) => {
    const from = req.session.user.id;
    const to = req.params.id;
    const { text } = req.body;
    const msg = { text };

    if (req.session.scope === 'customer') {
      const customer = await Customer.findById(from);
      if (!customer.conversations.includes(to)) {
        resp.status(400).json(err('You cannot start conversation with this restaurant'));
      }
      msg.fromRestaurant = false;
      msg.restaurant = to;
      msg.customer = from;
    }

    if (req.session.scope === 'restaurant') {
      const customer = await Customer.findById(to);
      if (!customer.conversations.includes(from)) {
        // Track conversations
        customer.conversations.push(from);
        await customer.save();
      }
      msg.fromRestaurant = true;
      msg.restaurant = from;
      msg.customer = to;
    }
    resp.json(await req.requestKafka('sendMessageTo', msg));
  },

  // TODO make 2 apis for customer and restaurant
  getMessagesFrom: async (req, resp) => {
    const curr = req.session.user.id;
    const from = req.params.id;

    if (req.session.scope === 'customer') {
      resp.json(await req.requestKafka('getMessagesFrom', curr, from));
    }

    if (req.session.scope === 'restaurant') {
      resp.json(await req.requestKafka('getMessagesFrom', from, curr));
    }
  },
  follow: async (req, resp) => {
    const customerId = req.session.user.id;
    const followId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer.following.includes(followId)) {
      customer.following.push(followId);
    }
    resp.json(await customer.save());
  },
  following: async (req, resp) => {
    const { search } = req.query;
    const { following } = await Customer.findById(req.session.user.id);
    const findClause = { _id: { $in: following.map(mongoose.Types.ObjectId) } };
    if (search) {
      Object.assign(findClause, { name: { $regex: search, $options: 'i' } });
    }
    const customers = await Customer.find(findClause);
    resp.json(customers);
  },
  customers: async (req, resp) => {
    const { search } = req.query;
    const { id, following } = await Customer.findById(req.session.user.id);
    const findClause = { _id: { $nin: [id, ...following].map(mongoose.Types.ObjectId) } };
    if (search) {
      Object.assign(findClause, { name: { $regex: search, $options: 'i' } });
    }
    const customers = await Customer.find(findClause);
    resp.json(customers);
  },
};
