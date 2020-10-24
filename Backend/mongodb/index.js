const mongoose = require('mongoose');

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

const modelDef = require('./models');

const models = {};
for (const k in modelDef) {
  const { model, transform } = modelDef[k];
  models[k] = mongoose.model(k, mongooseModel(model, transform));
}
module.exports = models;
