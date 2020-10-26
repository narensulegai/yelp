const {
  Message,
} = require('../mongodb');

module.exports = {
  sendMessageTo: async (msg) => {
    const message = new Message(msg);
    return message.save();
  },
  getMessagesFrom: async (customer, restaurant) => Message.find({ customer, restaurant }).sort({ createdAt: 'desc' }),
};
