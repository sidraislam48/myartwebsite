const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// In-memory cart storage (for demonstration)
let cart = [];

// Get cart
router.get('/', (req, res) => {
    res.status(200).json(cart);
});

// Add item to cart
router.post('/add', (req, res) => {
    const { imageId, title, price } = req.body;
    const cartItem = { imageId, title, price };
    cart.push(cartItem);
    res.status(201).json({ message: 'Item added to cart', cart });
});

// Remove item from cart
router.post('/remove', (req, res) => {
    const { imageId } = req.body;
    cart = cart.filter(item => item.imageId !== imageId);
    res.status(200).json({ message: 'Item removed from cart', cart });
});

// Clear cart
router.post('/clear', (req, res) => {
    cart = [];
    res.status(200).json({ message: 'Cart cleared' });
});

// Checkout - process order
router.post('/checkout', async (req, res) => {
    try {
        const { items, shippingAddress, userEmail, paymentMethod, total } = req.body;

        // Validate required fields
        if (!items || items.length === 0 || !shippingAddress || !userEmail || !paymentMethod || !total) {
            return res.status(400).json({ 
                success: false,
                error: 'Missing required fields' 
            });
        }

        // Generate order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create new order
        const newOrder = new Order({
            items,
            shippingAddress,
            userEmail,
            paymentMethod,
            total,
            orderId,
            status: 'pending'
        });

        // Save order to MongoDB
        await newOrder.save();

        console.log('Order saved to MongoDB:', orderId);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId,
            total,
            email: userEmail
        });

    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ 
            success: false,
            error: err.message || 'Error processing checkout' 
        });
    }
});

module.exports = router;
