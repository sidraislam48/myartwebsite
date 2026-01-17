const mongoose = require('mongoose');

// Contact Schema
const contactSchema = new mongoose.Schema({
    inquiryType: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    newsletter: { type: Boolean, default: false },
    status: { type: String, default: 'new' },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
