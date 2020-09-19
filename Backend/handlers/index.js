const multer = require('multer');
const path = require('path');
const Sequelize = require('sequelize');
const {
  Customer, Restaurant, Image, Dish, Event, CustomerEvent,
} = require('../db');

Event.belongsTo(Restaurant);
CustomerEvent.belongsTo(Event);
Event.hasMany(CustomerEvent);

const err = (msg) => ({ err: msg });
module.exports = {
  login: async (req, res) => {
    const u = req.params.user;
    const m = u === 'customer' ? Customer : Restaurant;
    const { email, password } = req.body;
    const cust = await m.findAll({ where: { email, password } });
    if (cust !== null && cust.length === 1) {
      [req.session.user] = cust;
      req.session.scope = u;
      res.json(cust[0]);
    } else {
      res.status(401).json(err('Email password doesn\'t match'));
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.json({});
  },
  current: async (req, resp) => {
    if (req.session && req.session.scope) {
      resp.json({ user: req.session.user, scope: req.session.scope });
    } else {
      resp.json({ user: null, scope: null });
    }
  },
  signupCustomer: async (req, resp) => {
    try {
      const r = await Customer.create(req.body);
      const newCustomer = r.get({ plain: true });
      delete newCustomer.password;
      req.session.user = newCustomer;
      req.session.scope = 'customer';
      resp.json(newCustomer);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        resp.status(400).json(err('Email id is already taken'));
      } else {
        throw e;
      }
    }
  },
  signupRestaurant: async (req, resp) => {
    try {
      const r = await Restaurant.create(req.body);
      const newRestaurant = r.get({ plain: true });
      delete newRestaurant.password;
      req.session.user = newRestaurant;
      req.session.scope = 'restaurant';
      resp.json(newRestaurant);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        resp.status(400).json(err('Email id is already taken'));
      } else {
        throw e;
      }
    }
  },
  uploadFile: async (req, res) => {
    const upload = multer({ dest: 'uploads/' }).array('files', 5);
    upload(req, res, (e) => {
      if (e) {
        res.status(400).json(err('Error while uploading file'));
      } else {
        res.json({ files: req.files.map((f) => f.filename) });
      }
    });
  },
  addImages: async (req, res) => {
    const p = req.body.fileIds.map((fid) => Image.create({
      fileId: fid,
      userId: req.session.user.id,
      scope: req.session.scope,
      type: req.body.type,
      typeId: req.body.typeId,
    }));
    res.json(await Promise.all(p));
  },
  getImages: async (req, res) => {
    const images = await Image.findAll({
      where: {
        userId: req.session.user.id,
        scope: req.session.scope,
      },
    });
    res.json(images);
  },
  deleteImage: async (req, res) => {
    const { id } = req.params;
    await Image.destroy({
      where: {
        userId: req.session.user.id,
        scope: req.session.scope,
        id,
      },
    });
    res.json({ id });
  },
  getFile: async (req, res) => {
    const userId = req.session.user.id;
    const { scope } = req.session;
    const fileId = req.params.id;
    const f = await Image.findOne({ where: { userId, scope, fileId } });
    // Check if user owns the file
    if (f === null) {
      res.status(404).json(err('File not found'));
    } else {
      res.sendFile(path.join(__dirname, '../uploads', fileId));
    }
  },
  updateRestaurantProfile: async (req, resp) => {
    resp.json(await Restaurant.update(req.body, { where: { id: req.session.user.id } }));
  },
  getRestaurantProfile: async (req, resp) => {
    resp.json(await Restaurant.findByPk(req.session.user.id));
  },
  updateCustomerProfile: async (req, resp) => {
    resp.json(await Customer.update(req.body, { where: { id: req.session.user.id } }));
  },
  getCustomerProfile: async (req, resp) => {
    resp.json(await Customer.findByPk(req.session.user.id));
  },
  createDish: async (req, resp) => {
    const dish = { ...req.body, restaurantId: req.session.user.id };
    resp.json(await Dish.create(dish));
  },
  updateDish: async (req, resp) => {
    resp.json(await Dish.update(req.body, {
      where: {
        restaurantId: req.session.user.id,
        id: req.params.id,
      },
    }));
  },
  getDishes: async (req, resp) => {
    resp.json(await Dish.findAll({ where: { restaurantId: req.session.user.id } }));
  },
  deleteDish: async (req, resp) => {
    resp.json(await Dish.destroy({
      where: {
        id: req.params.id,
        restaurantId: req.session.user.id,
      },
    }));
  },
  getRestaurantEvents: async (req, resp) => {
    resp.json(await Event.findAll({
      where: {
        restaurantId: req.session.user.id,
      },
    }));
  },
  createEvent: async (req, resp) => {
    resp.json(await Event.create({ restaurantId: req.session.user.id, ...req.body }));
  },
  getEvents: async (req, resp) => {
    const events = await Event.findAll({
      include: [
        { model: Restaurant },
        {
          model: CustomerEvent,
          where: { customerId: req.session.user.id },
          required: false, // Force left join
        },
      ],
    });
    resp.json(events.filter((r) => r.CustomerEvents.length === 0));
  },
  registerEvent: async (req, resp) => {
    resp.json(await CustomerEvent.create({
      customerId: req.session.user.id, eventId: req.params.id,
    }));
  },
  getCustomerEvents: async (req, resp) => {
    resp.json(await CustomerEvent.findAll({
      where: {
        customerId: req.session.user.id,
      },
      include: Event,
    }));
  },
};