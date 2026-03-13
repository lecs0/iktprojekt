const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');
const db = require('../db');

// Middleware to check authentication
const checkAuth = (req, res, next) => {
    if (!req.session.userId || !req.session.username) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    db.get(
        `SELECT id FROM admin_users WHERE username = ?`,
        [req.session.username],
        (err, adminUser) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            if (!adminUser) return res.status(403).json({ error: 'Admin access required' });
            next();
        }
    );
};

const adminWriteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many admin actions. Try again later.' }
});

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

function sanitizeText(value, maxLength = 255) {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLength);
}

function toSafeInt(value, defaultValue = 0) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : defaultValue;
}

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
        return forwarded.split(',')[0].trim().slice(0, 64);
    }
    return (req.ip || '').slice(0, 64);
}

function logAdminAction(req, action, details = '') {
    const adminUsername = req.session && req.session.username ? req.session.username : 'unknown';
    const safeAction = sanitizeText(action, 120);
    const safeDetails = sanitizeText(details, 2000);
    const ipAddress = getClientIp(req);

    db.run(
        `INSERT INTO admin_logs (admin_username, action, details, ip_address)
         VALUES (?, ?, ?, ?)`,
        [adminUsername, safeAction, safeDetails, ipAddress],
        (err) => {
            if (err) {
                console.error('Failed to write admin log:', err.message);
            }
        }
    );
}

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const secureUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (allowedImageTypes.has(file.mimetype)) return cb(null, true);
        return cb(new Error('Only JPG, PNG, or WEBP images are allowed'));
    }
});

// Get recent admin activity logs
router.get('/logs', checkAuth, (req, res) => {
    const limit = Math.min(200, Math.max(1, toSafeInt(req.query.limit, 50)));

    db.all(
        `SELECT id, admin_username, action, details, ip_address, created_at
         FROM admin_logs
         ORDER BY id DESC
         LIMIT ?`,
        [limit],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Create movie
router.post('/movies', checkAuth, adminWriteLimiter, secureUpload.single('poster'), (req, res) => {
    const {
        title,
        description,
        genre,
        release_year,
        duration,
        country,
        video_link,
        director,
        cast,
        rating
    } = req.body;

    const safeTitle = sanitizeText(title, 150);
    const safeDescription = sanitizeText(description, 3000);
    const safeGenre = sanitizeText(genre, 80);
    const safeCountry = sanitizeText(country, 80);
    const safeVideoLink = sanitizeText(video_link, 1000);
    const safeDirector = sanitizeText(director, 120);
    const safeCast = sanitizeText(cast, 1200);
    const safeReleaseYear = toSafeInt(release_year, null);
    const safeDuration = toSafeInt(duration, null);
    const safeRating = Number.isFinite(Number(rating)) ? Number(rating) : null;

    if (!safeTitle) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const posterImg = req.file ? `/uploads/${req.file.filename}` : null;

    db.run(
        `INSERT INTO movies (title, description, genre, release_year, duration, country, poster_img, video_link, director, cast, rating)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [safeTitle, safeDescription, safeGenre, safeReleaseYear, safeDuration, safeCountry, posterImg, safeVideoLink, safeDirector, safeCast, safeRating],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            logAdminAction(req, 'movie.create', `movieId=${this.lastID}; title=${safeTitle}`);
            res.json({ 
                success: true, 
                message: 'Movie created',
                id: this.lastID
            });
        }
    );
});

// Update movie
router.put('/movies/:id', checkAuth, adminWriteLimiter, secureUpload.single('poster'), (req, res) => {
    const id = toSafeInt(req.params.id, 0);
    const {
        title,
        description,
        genre,
        release_year,
        duration,
        country,
        video_link,
        director,
        cast,
        rating
    } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Invalid movie id' });
    }

    const safeTitle = sanitizeText(title, 150);
    const safeDescription = sanitizeText(description, 3000);
    const safeGenre = sanitizeText(genre, 80);
    const safeCountry = sanitizeText(country, 80);
    const safeVideoLink = sanitizeText(video_link, 1000);
    const safeDirector = sanitizeText(director, 120);
    const safeCast = sanitizeText(cast, 1200);
    const safeReleaseYear = toSafeInt(release_year, null);
    const safeDuration = toSafeInt(duration, null);
    const safeRating = Number.isFinite(Number(rating)) ? Number(rating) : null;

    if (!safeTitle) {
        return res.status(400).json({ error: 'Title is required' });
    }

    let posterImg = req.body.poster_img;
    if (req.file) {
        posterImg = `/uploads/${req.file.filename}`;
    }

    db.run(
        `UPDATE movies SET title=?, description=?, genre=?, release_year=?, duration=?, country=?, poster_img=?, video_link=?, director=?, cast=?, rating=?, updated_at=CURRENT_TIMESTAMP
         WHERE id=?`,
        [safeTitle, safeDescription, safeGenre, safeReleaseYear, safeDuration, safeCountry, posterImg, safeVideoLink, safeDirector, safeCast, safeRating, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            logAdminAction(req, 'movie.update', `movieId=${id}; title=${safeTitle}`);
            res.json({ success: true, message: 'Movie updated' });
        }
    );
});

// Delete movie
router.delete('/movies/:id', checkAuth, (req, res) => {
    const id = toSafeInt(req.params.id, 0);
    if (!id) {
        return res.status(400).json({ error: 'Invalid movie id' });
    }

    db.run(`DELETE FROM movies WHERE id=?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        logAdminAction(req, 'movie.delete', `movieId=${id}`);
        res.json({ success: true, message: 'Movie deleted' });
    });
});

// Get all movies (admin view)
router.get('/movies', checkAuth, (req, res) => {
    db.all(`SELECT * FROM movies ORDER BY created_at DESC`, (err, movies) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(movies);
    });
});

// Get single movie (admin view)
router.get('/movies/:id', checkAuth, (req, res) => {
    const id = toSafeInt(req.params.id, 0);
    if (!id) {
        return res.status(400).json({ error: 'Invalid movie id' });
    }

    db.get(`SELECT * FROM movies WHERE id=?`, [id], (err, movie) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    });
});

// ===== USER MANAGEMENT =====

const bcrypt = require('bcryptjs');

// Generate random temp password
function generateTempPassword() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 8);
}

// Create new user (with temp password)
router.post('/users', checkAuth, adminWriteLimiter, (req, res) => {
    const username = sanitizeText(req.body.username, 50);
    const email = sanitizeText(req.body.email, 120).toLowerCase();

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email required' });
    }

    const tempPassword = generateTempPassword();
    const hashedPassword = bcrypt.hashSync(tempPassword, 10);

    db.run(
        `INSERT INTO users (username, email, password, temp_password, must_change_password) VALUES (?, ?, ?, ?, 1)`,
        [username, email, hashedPassword, tempPassword],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ error: 'Username or email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            logAdminAction(req, 'user.create', `userId=${this.lastID}; username=${username}`);
            res.json({
                success: true,
                userId: this.lastID,
                username: username,
                tempPassword: tempPassword,
                message: `User created. Temp password: ${tempPassword}`
            });
        }
    );
});

// Get all users
router.get('/users', checkAuth, (req, res) => {
    db.all(
        `SELECT id, username, email, must_change_password, created_at FROM users ORDER BY created_at DESC`,
        (err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(users);
        }
    );
});

// Delete user
router.delete('/users/:id', checkAuth, adminWriteLimiter, (req, res) => {
    const id = toSafeInt(req.params.id, 0);
    if (!id) {
        return res.status(400).json({ error: 'Invalid user id' });
    }

    db.run(
        `DELETE FROM users WHERE id = ?`,
        [id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            logAdminAction(req, 'user.delete', `userId=${id}`);
            res.json({ success: true, message: 'User deleted' });
        }
    );
});

// Reset user password to temp password
router.post('/users/:id/reset-password', checkAuth, adminWriteLimiter, (req, res) => {
    const id = toSafeInt(req.params.id, 0);
    if (!id) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    const tempPassword = generateTempPassword();
    const hashedPassword = bcrypt.hashSync(tempPassword, 10);

    db.run(
        `UPDATE users SET password = ?, temp_password = ?, must_change_password = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [hashedPassword, tempPassword, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            logAdminAction(req, 'user.reset_password', `userId=${id}`);
            res.json({
                success: true,
                tempPassword: tempPassword,
                message: `Password reset. New temp password: ${tempPassword}`
            });
        }
    );
});

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || (err.message && err.message.includes('Only JPG, PNG, or WEBP'))) {
        return res.status(400).json({ error: err.message });
    }
    return next(err);
});

module.exports = router;
