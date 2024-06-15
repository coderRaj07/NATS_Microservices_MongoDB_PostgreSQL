const express = require('express');
const { connect, credsAuthenticator, StringCodec } = require('nats');
const { User } = require('./models');
const { jwt, seed } = require('./config/natConfig');

const start = async () => {
  const app = express();

  // Connect to NATS with credentials
  const nc = await connect({
    servers: 'connect.ngs.global',
    authenticator: credsAuthenticator(Buffer.from(jwt + seed))
  });

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await User.create({ name, email });

    // Publish user created event to NATS
    const sc = StringCodec();
    nc.publish('user.created', sc.encode(JSON.stringify(user)));
    
    res.status(201).json(user);
  });

  app.listen(4000, () => {
    console.log('User service listening on port 4000');
  });
};

start().catch(err => {
  console.error('Error starting the application', err);
  process.exit(1);
});
