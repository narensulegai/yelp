const { Kafka, logLevel } = require('kafkajs');

const k = new Kafka({
  logLevel: logLevel.ERROR,
  clientId: 'yelp',
  brokers: ['localhost:9092'],
});

const producer = k.producer();
// App wide consumer group
const consumer = k.consumer({ groupId: 'yelp', fromBeginning: true });

const allTopics = {
  MESSAGES: 'message-t1',
};

async function kafka() {
  // Topics need to be defined before staring the server
  const topics = Object.values(allTopics);
  const subscriptions = {};
  await producer.connect();
  await consumer.connect();

  await Promise.all(topics.map((topic) => consumer.subscribe({ topic })));

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (subscriptions.hasOwnProperty(topic)) {
        subscriptions[topic].forEach((callback) => {
          callback(JSON.parse(message.value.toString()), new Date(parseInt(message.timestamp)));
        });
      }
    },
  });
  return {
    send: async (topic, msg) => producer
      .send({ topic, messages: [{ value: JSON.stringify(msg) }] }),
    subscribe: async (topic, callback) => {
      if (!subscriptions.hasOwnProperty(topic)) {
        subscriptions[topic] = [];
      }
      subscriptions[topic].push(callback);
    },
  };
}

// Example usage
// (async () => {
//   const k = await kafka();
//   k.subscribe(allTopics.TOPIC1, console.log);
//   k.send(allTopics.TOPIC1, 'm1');
// })();

module.exports = { kafka, topics: allTopics };
