const mongoose = require('mongoose');

const {
  Schema: Types,
} = mongoose;
// mongoose.connect('mongodb+srv://yelp:yelp2020@cluster0.g7lcr.mongodb.net/test', {
mongoose.connect('mongodb://localhost/yelp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  console.log('Mongo error');
});
mongoose.connection.once('open', () => {
  console.log('Connected to mongo');
});

const t = (schema, transform) => schema
  .set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      transform(doc, ret);
    },
  });

const s = (schema) => {
  const sch = {};
  for (const k in schema) {
    if (k[0] === k[0].toUpperCase()) {
      const { model, transform } = schema[k];
      // eslint-disable-next-line no-use-before-define
      sch[k] = [mongooseModel(model, transform)];
    } else {
      sch[k] = schema[k];
    }
  }
  return new mongoose.Schema(sch, { timestamps: true });
};

const mongooseModel = (schema, transform) => t(s(schema), transform || (() => {}));

const modelDef = {
  Customer: {
    model: {
      fileId: { type: String },
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      yelpingSince: { type: String, default: '' },
      thingsILove: { type: String, default: '' },
      website: { type: String, default: '' },
      about: { type: String, default: '' },
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Restaurant: {
    model: {
      fileIds: [{ type: String }],
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      location: { type: String, default: '' },
      description: { type: String, default: '' },
      contactInformation: { type: String, default: '' },
      timings: { type: String, default: '' },
      dishes: [{ type: Types.ObjectId, ref: 'Dish', required: true }],
      events: [{ type: Types.ObjectId, ref: 'Event', required: true }],
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Event: {
    model: {
      name: { type: String, required: true },
      description: { type: String, default: '' },
      location: { type: String, default: '' },
      hashTags: { type: String, default: '' },
      date: { type: String, default: '' },
      time: { type: String, default: '' },
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      Registration: {
        model: {
          customer: { type: Types.ObjectId, ref: 'Customer', required: true },
        },
      },
    },
  },
  Dish: {
    model: {
      fileIds: [{ type: String }],
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      name: { type: String, required: true },
      ingredients: { type: String, default: '' },
      price: { type: String, default: '' },
      description: { type: String, default: '' },
      dishCategory: { type: Number, default: null },
    },
  },
  Order: {
    model: {
      customer: { type: Types.ObjectId, ref: 'Customer', required: true },
      dish: { type: Types.ObjectId, ref: 'Dish', required: true },
      isCanceled: { type: Boolean, default: false },
      isPickup: { type: Boolean, default: true },
      status: { type: String, required: true },
    },
  },
  Image: {
    model: {
      fileId: { type: String, required: true },
      scope: { type: String, required: true },
      type: { type: String, required: true },
      typeId: { type: String, default: null },
      userId: { type: Types.ObjectId, default: null },
    },
  },
  Comment: {
    model: {
      restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
      dish: { type: Types.ObjectId, ref: 'Dish', required: true },
      customer: { type: Types.ObjectId, ref: 'Customer', required: true },
      text: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  },
};

const models = {};
for (const k in modelDef) {
  const { model, transform } = modelDef[k];
  models[k] = mongoose.model(k, mongooseModel(model, transform));
}
module.exports = models;
