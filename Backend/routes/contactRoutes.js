const express = require('express');
const router = express.Router();

try {
    var Contact = require('../models/Contact');
    console.log('✓ Contact model imported successfully');
} catch (err) {
    console.error('✗ Failed to import Contact model:', err);
}

// Helper function to save contact
async function saveContact(req, res) {
    try {
        console.log('\n=== CONTACT FORM SUBMISSION ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Request body:', req.body);
        
        const { inquiryType, fullName, email, phone, message, newsletter } = req.body;
        
        // Validate required fields
        if (!inquiryType || !fullName || !email || !message) {
            console.log('❌ Validation failed - Missing required fields:');
            console.log('  inquiryType:', inquiryType);
            console.log('  fullName:', fullName);
            console.log('  email:', email);
            console.log('  message:', message);
            return res.status(400).json({ 
                message: 'Missing required fields',
                success: false,
                missing: {
                    inquiryType: !inquiryType,
                    fullName: !fullName,
                    email: !email,
                    message: !message
                }
            });
        }
        
        console.log('✓ All required fields present');
        
        // Create new contact document
        const contactData = {
            inquiryType,
            fullName,
            email,
            phone: phone || '',
            message,
            newsletter: newsletter || false,
            status: 'new'
        };
        
        console.log('Creating Contact document:', contactData);
        const newContact = new Contact(contactData);
        
        console.log('Attempting to save to MongoDB...');
        const savedContact = await newContact.save();

        console.log('✅ CONTACT SAVED SUCCESSFULLY!');
        console.log('Document ID:', savedContact._id);
        console.log('Document:', savedContact);
        
        res.status(201).json({ 
            message: 'Your message has been received. We will get back to you soon!',
            success: true,
            messageId: savedContact._id,
            data: savedContact
        });
        
    } catch (err) {
        console.error('\n❌ ERROR IN CONTACT FORM:');
        console.error('Error message:', err.message);
        console.error('Error type:', err.name);
        console.error('Error stack:', err.stack);
        console.error('Full error:', err);
        
        res.status(500).json({ 
            message: 'Error processing contact form', 
            error: err.message,
            errorType: err.name,
            success: false 
        });
    }
}

// Contact form submission - both endpoints for compatibility
router.post('/', saveContact);
router.post('/submit', saveContact);

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'Contact API is working', timestamp: new Date() });
});

module.exports = router;
