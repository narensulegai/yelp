const { Sequelize } = require('sequelize');
const models = require('./models');

const db = new Sequelize('mysql://root:@localhost:3306/yelp');

const dbModel = models.reduce((acc, m) => {
  acc[m.modelName] = db.define(m.modelName, m.attributes, m.options || {});
  return acc;
}, {});

(async () => {
  // await db.sync({ force: true, alter: true });
  // await db.sync({ alter: true });
})();

module.exports = {
  ...dbModel,
};
