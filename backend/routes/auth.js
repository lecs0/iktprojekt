const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const db = require('../db');

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Try again later.' }
});

function sanitizeUsername(value) {
    if (typeof value !== 'string') return '';
    return value.trim();
}

// Login route
router.post('/login', adminLoginLimiter, (req, res) => {
    const username = sanitizeUsername(req.body.username);
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!username || !password || username.length > 50 || password.length > 128) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    db.get(
        `SELECT * FROM admin_users WHERE username = ?`,
        [username],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Create session
            req.session.userId = user.id;
            req.session.username = user.username;

            res.json({ 
                success: true, 
                message: 'Logged in successfully',
                user: { id: user.id, username: user.username }
            });
        }
    );
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Check auth status (verifies the user is actually in admin_users)
router.get('/status', (req, res) => {
    if (!req.session.userId || !req.session.username) {
        return res.json({ authenticated: false });
    }

    db.get(
        `SELECT id FROM admin_users WHERE username = ?`,
        [req.session.username],
        (err, adminRow) => {
            if (err || !adminRow) {
                return res.json({ authenticated: false });
            }
            res.json({
                authenticated: true,
                user: { id: req.session.userId, username: req.session.username }
            });
        }
    );
});

module.exports = router;
