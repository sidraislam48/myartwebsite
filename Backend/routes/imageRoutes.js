const express = require('express');
const Image = require('../models/Image');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Get all images (public)
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching images', error: err.message });
    }
});

// Get image by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching image', error: err.message });
    }
});

// Create new image (requires authentication)
router.post('/', verifyToken, async (req, res) => {
    const { title, url, description } = req.body;
    const newImage = new Image({ title, url, description });
    try {
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: 'Error creating image', error: err.message });
    }
});

// Update image (requires authentication)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Error updating image', error: err.message });
    }
});

// Delete image (requires authentication)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting image', error: err.message });
    }
});

module.exports = router;
