const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yelp:yelp2020@cluster0.g7lcr.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});
mongoose.connection.on('error', () => {
  console.log('Mongo error');
});
mongoose.connection.once('open', () => {
  console.log('Connected to cluster0.g7lcr.mongodb.net/yelp');
});

const t = (schema, transform) => schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    transform(doc, ret);
  },
});

const modelDef = {
  Customer: {
    model: {
      fileId: { type: String, required: true },
      scope: { type: String, required: true },
      type: { type: String, required: true },
      typeId: { type: String, default: null },
      userId: { type: String, default: null },
    },
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  Image: {
    model: {
      fileId: { type: String, required: true },
      scope: { type: String, required: true },
      type: { type: String, required: true },
      typeId: { type: String, default: null },
      userId: { type: String, default: null },
    },
  },
  Comment: {
    model: {
      dishId: { type: String, required: true },
      customerId: { type: String, required: true },
      text: { type: String, required: true },
      rating: { type: String, required: true },
    },
  },
};

const models = {};
for (const k in modelDef) {
  const { model, transform } = modelDef[k];
  const schema = new mongoose.Schema(model, { timestamps: true });
  models[k] = mongoose.model(k, t(schema, transform || (() => {})));
}
module.exports = models;
