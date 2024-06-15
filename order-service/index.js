const express = require('express');
const mongoose = require('mongoose');
const { connect, credsAuthenticator, StringCodec } = require('nats');
const userCreatedSubscriber = require('./subscribers/userCreatedSubscriber');
const Order = require('./models/order');
require('dotenv').config();
const {jwt, seed} = require('./config/natConfig');

const start = async () => {
  const app = express();


 
  // Connect to NATS with credentials
  const nc = await connect({
    servers: 'connect.ngs.global',
    authenticator: credsAuthenticator(Buffer.from(jwt + seed))
  });


  // Connect to MongoDB Atlas
  await mongoose.connect(process.env.MONGO_URI);

  // Subscribers
  userCreatedSubscriber(nc);


  // Express middleware to parse JSON bodies
  app.use(express.json());

  // Endpoint to create a new order
  app.post('/orders', async (req, res) => {
    const { userId, items } = req.body;
    const order = new Order({ userId, items });
    await order.save();
    res.status(201).json(order);
  });

  // Start the Express server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Order service is running on port ${PORT}`);
  });
};

// Call the start function to run the application
start().catch(err => {
  console.error('Error starting the application', err);
  process.exit(1);
});
