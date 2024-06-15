const mongoose = require('mongoose');
const { StringCodec } = require('nats');
const User = require('../models/user');

module.exports = function (nc) {
    const sc = StringCodec();
    const subscription = nc.subscribe('user.created');
    (async () => {
        for await (const msg of subscription) {
            try {
                const user = JSON.parse(sc.decode(msg.data));
                console.log(`Received user created event: ${user.name} (${user.email})`);
                // Store the user data in the database
                const newUser = await User.create({
                    name: user.name,
                    email: user.email
                });
                // await newUser.save();
                console.log('User data stored:', newUser);
            } catch (error) {
                console.error('Error processing user.created event', error);
            }
        }
    })();
}

