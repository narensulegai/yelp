# yelp
Install kafka on Mac https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273

Install Kafka client https://github.com/edenhill/kafkacat
### Run Kafka server

```
cd backend && KAFKA_BROKERS=localhost:9092 npm run kafka
```

### Run node server
```
cd backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/yelp npm start
```

### Run frontend server
```
cd frontend && npm start
```
