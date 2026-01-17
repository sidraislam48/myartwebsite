const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../middleware/auth');
const router = express.Router();

// ======================
// User Registration
// ======================
router.post('/register', async (req, res) => {
    try {
        console.log('Register endpoint hit');
        console.log('Request body:', req.body);

        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            console.log('Missing fields');
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if username OR email already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'Username or email already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        console.log('User created:', newUser);

        const token = generateToken(newUser);
        res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: { username, email }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// ======================
// User Login (single 'login' field)
// ======================
router.post('/login', async (req, res) => {
    try {
        console.log('Login endpoint hit');
        console.log('Request body:', req.body);

        // Frontend sends { login: "...", password: "..." }
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Missing login or password' });
        }

        // Search by username OR email
        const user = await User.findOne({
            $or: [
                { username: login },
                { email: login }
            ]
        });

        if (!user) {
            console.log('User not found:', login);
            return res.status(400).json({ message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        console.log('User authenticated:', user.username);

        const token = generateToken(user);
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: { email: user.email }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

// ======================
// Get Current User (Protected)
// ======================
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
});

module.exports = router;
