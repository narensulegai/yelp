# yelp
Install kafka on Mac https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273

Kafka client https://github.com/edenhill/kafkacat
### Run Kafka server
KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/yelp npm start
```
cd backend && KAFKA_BROKERS=localhost:9092 node kafkaServer.js
```

### Run node server
```
cd backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/yelp npm start
```

### Run frontend server
```
cd frontend && npm start
```
