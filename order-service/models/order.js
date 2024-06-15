const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;