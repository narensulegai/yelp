const {
  Message,
} = require('../mongodb');

module.exports = {
  saveMessage: (msg) => {
    const message = new Message(msg);
    return message.save();
  },
};
