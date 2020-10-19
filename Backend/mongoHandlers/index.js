const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const {
  Customer, Restaurant, Image,
} = require('../mongodb');

const saltRounds = 10;
const err = (msg) => ({ err: msg });

module.exports = {
  signupCustomer: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const customer = new Customer({ ...req.body, password });
      try {
        const c = await customer.save();
        req.session.user = c;
        req.session.scope = 'customer';
        resp.json(c);
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
        const c = await restaurant.save();
        req.session.user = c;
        req.session.scope = 'restaurant';
        resp.json(c);
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
    resp.json(await Customer.findById(req.session.user.id));
  },
  login: async (req, res) => {
    const u = req.params.user;
    const m = u === 'customer' ? Customer : Restaurant;
    const { email, password } = req.body;
    const user = await m.findOne({ email });
    if (user === null) {
      res.status(401).json(err('Email doesn\'t exist'));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          delete user.password;
          req.session.user = user;
          req.session.scope = u;
          res.json(user);
        } else {
          res.status(401).json(err('Email password doesn\'t match'));
        }
      });
    }
  },
  addImages: async (req, res) => {
    const images = req.body.fileIds
      .map((fid) => new Image({
        fileId: fid,
        userId: req.session.user.id,
        scope: req.session.scope,
        type: req.body.type,
        typeId: req.body.typeId,
      }));
    res.json(await Promise.all(images.map((i) => i.save())));
  },
  getImages: async (req, res) => {
    res.json(await Image.find({ userId: req.session.user.id, scope: req.session.scope }));
  },
  deleteImage: async (req, res) => {
    const { id } = req.params;
    await Image.deleteOne({
      userId: req.session.user.id,
      scope: req.session.scope,
      _id: id,
    });
    res.json({ id });
  },
  getFile: async (req, res) => {
    const fileId = req.params.id;
    const f = await Image.findOne({ fileId });
    // Check if user owns the file
    if (f === null) {
      res.status(404).json(err('File not found'));
    } else {
      res.sendFile(path.join(__dirname, '../uploads', fileId));
    }
  },
  addComment: async (req, resp) => {
    const cust = await Customer.findById(req.session.user.id);
    cust.Comment.push({
      dishId: req.params.id,
      ...req.body,
    });
    resp.json(await cust.save());
  },
  getRestaurants: async (req, resp) => {
    // TODO
    // const { search } = req.query;
    const restaurant = await Restaurant.find();
    resp.json(restaurant);
  },
  getComments: async (req, resp) => {
    resp.json(await Customer.aggregate()
      .match({ 'Comment.dishId': req.params.id })
      .unwind('Comment')
      .sort({ 'Comment.createdAt': 'desc' }));
  },
  updateRestaurantProfile: async (req, resp) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.session.user.id, req.body);
    resp.json(await restaurant.save());
  },
  getRestaurantProfile: async (req, resp) => {
    resp.json(await Restaurant.findById(req.session.user.id));
  },
  createDish: async (req, resp) => {
    const restaurant = await Restaurant.findById(req.session.user.id);
    const dish = { ...req.body };
    restaurant.Dish.push(dish);
    resp.json(await restaurant.save());
  },
  getDishes: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const restaurant = await Restaurant
      .findById(restaurantId)
      .populate('Dish.Comment.customerId');
    resp.json(restaurant.Dish);
  },
  updateDish: async (req, resp) => {
    const restaurant = await Restaurant.findById(req.session.user.id);
    Object.assign(restaurant.Dish.id(req.params.id), req.body);
    restaurant.markModified('Dish');
    resp.json(await restaurant.save());
  },
  deleteDish: async (req, resp) => {
    const restaurant = await Restaurant.findById(req.session.user.id);
    restaurant.Dish.id(req.params.id).remove();
    resp.json(await restaurant.save());
  },
  getRestaurantEvents: async (req, resp) => {
    const restaurantId = req.session.user.id;
    const restaurant = await Restaurant
      .findById(restaurantId)
      .populate('Event.Registration.customerId');
    resp.json(restaurant.Event);
  },
  createEvent: async (req, resp) => {
    const restaurant = await Restaurant.findById(req.session.user.id);
    restaurant.Event.push(req.body);
    resp.json(await restaurant.save());
  },
  deleteEvent: async (req, resp) => {
    const restaurant = await Restaurant.findById(req.session.user.id);
    restaurant.Event.id(req.params.id).remove();
    resp.json(await restaurant.save());
  },
  getUnregisteredEvents: async (req, resp) => {
    const customerId = req.session.user.id;
    const restaurant = await Restaurant
      .aggregate([
        { $unwind: '$Event' },
        { $match: { 'Event.Registration.customerId': { $ne: mongoose.Types.ObjectId(customerId) } } },
        {
          $addFields: {
            id: '$_id',
            'Event.id': '$Event._id',
          },
        },
        {
          $project: {
            'Event.Registration': 0,
            'Event._id': 0,
          },
        },
      ]);
    resp.json(restaurant.map((r) => r.Event));
  },
  registerEvent: async (req, resp) => {
    const eventId = req.params.id;
    const customerId = req.session.user.id;
    const restaurant = await Restaurant.findOne({ 'Event._id': eventId });
    restaurant.Event.id(eventId).Registration.push({ customerId });
    resp.json(await restaurant.save());
  },
  getCustomerEvents: async (req, resp) => {
    const customerId = req.session.user.id;
    const restaurant = await Restaurant
      .aggregate([
        { $unwind: '$Event' },
        { $match: { 'Event.Registration.customerId': mongoose.Types.ObjectId(customerId) } },
        {
          $addFields: {
            id: '$_id',
            'Event.id': '$Event._id',
          },
        },
        {
          $project: {
            'Event.Registration': 0,
            'Event._id': 0,
          },
        },
      ]);
    resp.json(restaurant.map((r) => r.Event));
  },
};
