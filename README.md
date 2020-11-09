# yelp
Install kafka on Mac https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273

Install Kafka client https://github.com/edenhill/kafkacat

All config variables are availabe at `Backend/.env` and `Frontend/.env`
### Run Kafka server

```
cd backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/yelp npm run kafka
```

### Run node server
```
cd backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/yelp npm start
```

### Run frontend server
```
cd frontend && npm start
```
