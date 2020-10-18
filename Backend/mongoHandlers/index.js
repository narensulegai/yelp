const bcrypt = require('bcrypt');
const path = require('path');
const { Customer, CustomerPassword, Image, Comment } = require('../mongodb');

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
  getCustomerProfile: async (req, resp) => {
    resp.json(await Customer.findById(req.session.user.id));
  },
  login: async (req, res) => {
    const u = req.params.user;
    const m = CustomerPassword;
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
    const comment = {
      ...req.body,
      customerId: req.session.user.id,
      dishId: req.params.id,
    };
    resp.json(await Comment.create(comment));
  },
};
