const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String }
    }],
    shippingAddress: { type: String, required: true },
    userEmail: { type: String, required: true },
    paymentMethod: { type: String, enum: ['card', 'paypal'], required: true },
    total: { type: Number, required: true },
    orderId: { type: String, unique: true, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
