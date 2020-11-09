const { Kafka, logLevel } = require('kafkajs');
const crypto = require('crypto');

const kafkaUser = process.env.KAFKA_USER;

const allTopics = {
  API_CALL: `${kafkaUser}-api-call`,
  API_RESP: `${kafkaUser}-api-resp`,
};

const clientId = 'yelp';

async function kafka() {
  let config = {
    clientId,
    logLevel: logLevel.ERROR,
    brokers: process.env.KAFKA_BROKERS.split(','),
  };
  if (process.env.KAFKA_REMOTE === 'true') {
    config = {
      clientId,
      logLevel: logLevel.ERROR,
      brokers: process.env.KAFKA_BROKERS.split(','),
      authenticationTimeout: 1000,
      reauthenticationThreshold: 10000,
      ssl: true,
      sasl: {
        mechanism: 'scram-sha-256', // plain, scram-sha-256 or scram-sha-512
        username: kafkaUser,
        password: process.env.KAFKA_PASSWORD,
      },
    };
  }
  const k = new Kafka(config);
  const producer = k.producer();
  const groupId = process.env.GROUP;
  // App wide consumer group
  const consumer = k.consumer({ groupId, fromBeginning: true });
  // Topics need to be defined before staring the server
  const topics = Object.values(allTopics);
  const subscriptions = {};
  await producer.connect();
  await consumer.connect();
  const awaitCallbacks = {};
  await Promise.all(topics.map((topic) => consumer.subscribe({ topic })));

  const send = async (topic, msg) => producer
    .send({ topic, messages: [{ value: JSON.stringify(msg) }] });

  const subscribe = (topic, callback, name = null) => {
    if (!subscriptions.hasOwnProperty(topic)) {
      subscriptions[topic] = [];
    }
    subscriptions[topic].push((...args) => callback(...args, name));
  };

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (subscriptions.hasOwnProperty(topic)) {
        subscriptions[topic].forEach((callback) => {
          callback(JSON.parse(message.value.toString()), new Date(parseInt(message.timestamp)));
        });
      }
    },
  });

  console.log(`Connected to kafka, joining consumer group ${groupId}`);

  subscribe(allTopics.API_RESP, ({ token, resp, success }) => {
    if (awaitCallbacks[token]) {
      awaitCallbacks[token][success ? 0 : 1](resp);
      delete awaitCallbacks[token];
    }
  });

  return {
    send,
    subscribe,
    callAndWait: (fn, ...params) => new Promise((resolve, reject) => {
      const token = crypto.randomBytes(64).toString('hex');
      awaitCallbacks[token] = [resolve, reject];
      send(allTopics.API_CALL, { fn, params, token });
    }),
  };
}

// Example usage
// (async () => {
//   const k = await kafka();
// k.subscribe(allTopics.API_CALL, console.log);
// k.send(allTopics.API_CALL, 'm1');
// const s = await k.callAndWait('sum', [1, 2]);
// })();
module.exports = { kafka, topics: allTopics };
