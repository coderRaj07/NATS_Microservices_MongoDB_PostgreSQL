const { StringCodec } = require('nats');

// Why the Below Commented Code Might Fail
// Asynchronous Issues:
// If the callback in the commented code needs to perform asynchronous operations (e.g., database writes),
// not handling these properly can lead to issues such as race conditions or unhandled promise rejections.

// Error Handling: The commented code does not have a try...catch block,
// so any error in processing a message would not be caught and logged, potentially causing the application to silently fail.

//   module.exports = function(nc) {
//     const sc = StringCodec();
//     nc.subscribe('user.created', (msg) => {
//       const user = JSON.parse(sc.decode(msg.data));
//       console.log(`Received user created event: ${user.name} (${user.email})`);
//       // Handle the event (e.g., create a new order for the user)
//     });
//   };

module.exports = function(nc) {
  const sc = StringCodec();
  const subscription = nc.subscribe('user.created');
  (async () => {
    for await (const msg of subscription) {
      try {
        const user = JSON.parse(sc.decode(msg.data));
        console.log(`Received user created event: ${user.name} (${user.email})`);
        // Handle the event (e.g., create a new order for the user)
      } catch (error) {
        console.error('Error processing user.created event', error);
      }
    }
  })();
};


