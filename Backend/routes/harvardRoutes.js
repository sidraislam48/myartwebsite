const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const router = express.Router();

// Harvard Art API endpoint
const HARVARD_BASE_URL = 'https://api.harvardartmuseums.org';
const HARVARD_API_KEY = process.env.HARVARD_API_KEY;

console.log('Harvard API Key loaded:', HARVARD_API_KEY ? '✓ Yes' : '✗ No');
console.log('API Key value:', HARVARD_API_KEY);

// Get random Harvard artworks with valid images
router.get('/', async (req, res) => {
    try {
        const page = req.query.page || Math.floor(Math.random() * 30);
        const limit = req.query.limit || 50;
        
        console.log(`Fetching Harvard art from page ${page} with limit ${limit}`);
        
        const url = `${HARVARD_BASE_URL}/object?${HARVARD_API_KEY}&size=${limit}&page=${page}&hasImages=true`;
        
        console.log(`Calling: ${url.replace(HARVARD_API_KEY, 'API_KEY')}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Harvard API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log(`Raw response: ${JSON.stringify(data.records.slice(0, 2))}`);
        
        // Filter records to only include those with valid images
        const validRecords = data.records
            .filter(record => {
                // Check multiple conditions for valid image
                const hasImages = record.images && record.images.length > 0;
                const hasPrimaryImage = record.primaryImage && record.primaryImage.length > 0;
                const hasImageUrl = hasPrimaryImage;
                
                return hasImages && hasImageUrl;
            })
            .map(record => ({
                ...record,
                displayImage: record.primaryImage || (record.images && record.images[0]?.baseimageurl)
            }))
            .slice(0, 3);
        
        console.log(`✓ Found ${validRecords.length} artworks with accessible images out of ${data.records.length} total`);
        
        if (validRecords.length === 0) {
            console.log('No valid records found, trying different filtering...');
            // Try alternative approach
            const altRecords = data.records
                .filter(record => record.images && record.images.length > 0)
                .slice(0, 3);
            
            console.log(`✓ Found ${altRecords.length} artworks using alternative filter`);
            
            return res.json({
                records: altRecords,
                info: {
                    total: altRecords.length,
                    fetched: data.records.length
                }
            });
        }
        
        res.json({
            records: validRecords,
            info: {
                total: validRecords.length,
                fetched: data.records.length
            }
        });
        
    } catch (error) {
        console.error('Harvard API error:', error);
        res.status(500).json({
            error: 'Failed to fetch from Harvard API',
            message: error.message
        });
    }
});

// Search Harvard art with valid images
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q || 'portrait';
        console.log(`Searching Harvard for: ${query}`);
        
        const url = `${HARVARD_BASE_URL}/object?${HARVARD_API_KEY}&q=${encodeURIComponent(query)}&hasImages=true&size=50`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Harvard API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Filter records to only include those with valid images
        const validRecords = data.records
            .filter(record => {
                return (record.images && record.images.length > 0) && (record.primaryImage && record.primaryImage.length > 0);
            })
            .slice(0, 3);
        
        console.log(`✓ Found ${validRecords.length} results for "${query}" with accessible images`);
        
        res.json({
            records: validRecords,
            info: {
                total: validRecords.length,
                searched: data.records.length
            }
        });
        
    } catch (error) {
        console.error('Harvard search error:', error);
        res.status(500).json({
            error: 'Failed to search Harvard API',
            message: error.message
        });
    }
});

module.exports = router;
