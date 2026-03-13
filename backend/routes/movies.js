const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all movies
router.get('/', (req, res) => {
    db.all(`SELECT * FROM movies ORDER BY created_at DESC`, (err, movies) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(movies);
    });
});

// Search movies
router.get('/search', (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Search query required' });
    }

    const searchTerm = `%${q}%`;
    db.all(
        `SELECT * FROM movies WHERE title LIKE ? OR genre LIKE ? OR description LIKE ? ORDER BY created_at DESC`,
        [searchTerm, searchTerm, searchTerm],
        (err, movies) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(movies);
        }
    );
});

// Get single movie
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM movies WHERE id = ?`, [id], (err, movie) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    });
});

module.exports = router;
