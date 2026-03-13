const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');
const db = require('../db');

const router = express.Router();

const userLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Try again later.' }
});

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

function sanitizeText(value, maxLength = 255) {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLength);
}

function isValidUsername(value) {
    return /^[a-zA-Z0-9_.-]{3,30}$/.test(value);
}

function toSafeInt(value, defaultValue = 0) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : defaultValue;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

// Avatar upload storage
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar_' + Date.now() + path.extname(file.originalname));
    }
});
const uploadAvatar = multer({
    storage: avatarStorage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (allowedImageTypes.has(file.mimetype)) return cb(null, true);
        return cb(new Error('Only JPG, PNG, or WEBP images are allowed'));
    }
});

// Middleware to check user authentication
function checkUserAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// User Login
router.post('/login', userLoginLimiter, (req, res) => {
    const username = sanitizeText(req.body.username, 50);
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!username || !password || !isValidUsername(username) || password.length > 128) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    db.get(
        `SELECT id, username, password, must_change_password FROM users WHERE username = ?`,
        [username],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // If user must change password (first login), accept ANY password
            if (user.must_change_password === 1) {
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.mustChangePassword = 1;
                res.json({
                    success: true,
                    mustChangePassword: true
                });
            } else if (bcrypt.compareSync(password, user.password)) {
                // Normal login with password check
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.mustChangePassword = 0;
                res.json({
                    success: true,
                    mustChangePassword: false
                });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    );
});

// User Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true });
    });
});

// Check user auth status
router.get('/status', (req, res) => {
    if (req.session.userId) {
        // Check if this username also exists as an admin
        db.get(
            `SELECT id FROM admin_users WHERE username = ?`,
            [req.session.username],
            (err, adminRow) => {
                res.json({
                    authenticated: true,
                    username: req.session.username,
                    mustChangePassword: req.session.mustChangePassword === 1,
                    isAdmin: !!adminRow
                });
            }
        );
    } else {
        res.json({ authenticated: false });
    }
});

// Change password (first time or anytime)
router.post('/change-password', checkUserAuth, (req, res) => {
    const oldPassword = typeof req.body.oldPassword === 'string' ? req.body.oldPassword : '';
    const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old and new password required' });
    }

    if (newPassword.length < 6 || newPassword.length > 128) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    db.get(
        `SELECT password FROM users WHERE id = ?`,
        [req.session.userId],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Verify old password
            if (!bcrypt.compareSync(oldPassword, user.password)) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }

            // Hash new password
            const hashedPassword = bcrypt.hashSync(newPassword, 10);

            // Update password and clear must_change_password flag
            db.run(
                `UPDATE users SET password = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                [hashedPassword, req.session.userId],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to update password' });
                    }

                    req.session.mustChangePassword = 0;

                    // Sync password to admin_users if this user is also an admin
                    db.run(
                        `UPDATE admin_users SET password = ? WHERE username = ?`,
                        [hashedPassword, req.session.username],
                        function() {} // silent — not an error if user isn't admin
                    );

                    res.json({ success: true, message: 'Password changed successfully' });
                }
            );
        }
    );
});

// ── Watch Progress ────────────────────────────────────────────────────────────

// Save / update watch progress for a movie
router.post('/progress', checkUserAuth, (req, res) => {
    const movieId = toSafeInt(req.body.movie_id, 0);
    const progressSeconds = clamp(toSafeInt(req.body.progress_seconds, 0), 0, 24 * 60 * 60);
    const durationSeconds = clamp(toSafeInt(req.body.duration_seconds, 0), 0, 24 * 60 * 60);
    if (!movieId) return res.status(400).json({ error: 'movie_id required' });

    const completed = durationSeconds > 0 && progressSeconds >= durationSeconds * 0.9 ? 1 : 0;

    db.run(
        `INSERT INTO watch_history (user_id, movie_id, progress_seconds, duration_seconds, completed, last_watched)
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, movie_id) DO UPDATE SET
             progress_seconds = excluded.progress_seconds,
             duration_seconds = excluded.duration_seconds,
             completed = excluded.completed,
             last_watched = CURRENT_TIMESTAMP`,
        [req.session.userId, movieId, progressSeconds, durationSeconds, completed],
        (err) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.json({ success: true });
        }
    );
});

// Get continue-watching list (in-progress, not completed, most recent first)
router.get('/continue-watching', checkUserAuth, (req, res) => {
    db.all(
        `SELECT wh.movie_id, wh.progress_seconds, wh.duration_seconds, wh.last_watched,
                m.title, m.poster_img, m.duration
         FROM watch_history wh
         JOIN movies m ON m.id = wh.movie_id
         WHERE wh.user_id = ? AND wh.completed = 0 AND wh.progress_seconds > 30
         ORDER BY wh.last_watched DESC
         LIMIT 20`,
        [req.session.userId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.json(rows);
        }
    );
});

// Get full watch history (newest first)
router.get('/history', checkUserAuth, (req, res) => {
    db.all(
        `SELECT wh.movie_id, wh.progress_seconds, wh.duration_seconds, wh.completed, wh.last_watched,
                m.title, m.poster_img, m.genre, m.release_year, m.duration, m.rating
         FROM watch_history wh
         JOIN movies m ON m.id = wh.movie_id
         WHERE wh.user_id = ?
         ORDER BY wh.last_watched DESC`,
        [req.session.userId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.json(rows);
        }
    );
});

// Get user profile stats
router.get('/profile', checkUserAuth, (req, res) => {
    const userId = req.session.userId;

    db.get(`SELECT username, email, avatar, created_at FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err || !user) return res.status(500).json({ error: 'DB error' });

        db.get(
            `SELECT
                COUNT(*) as movies_watched,
                SUM(progress_seconds) as total_seconds,
                SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed_count
             FROM watch_history WHERE user_id = ?`,
            [userId],
            (err, stats) => {
                if (err) stats = {};

                // Top genres
                db.all(
                    `SELECT m.genre, COUNT(*) as cnt
                     FROM watch_history wh
                     JOIN movies m ON m.id = wh.movie_id
                     WHERE wh.user_id = ? AND m.genre IS NOT NULL
                     GROUP BY m.genre
                     ORDER BY cnt DESC
                     LIMIT 5`,
                    [userId],
                    (err, genres) => {
                        // Top rated (highest rated movies the user watched)
                        db.all(
                            `SELECT m.id as movie_id, m.title, m.poster_img, m.rating, m.genre, m.release_year, wh.completed
                             FROM watch_history wh
                             JOIN movies m ON m.id = wh.movie_id
                             WHERE wh.user_id = ? AND m.rating IS NOT NULL
                             ORDER BY m.rating DESC
                             LIMIT 5`,
                            [userId],
                            (err, topMovies) => {
                                res.json({
                                    username: user.username,
                                    email: user.email,
                                    avatar: user.avatar || null,
                                    member_since: user.created_at,
                                    movies_watched: stats.movies_watched || 0,
                                    completed_count: stats.completed_count || 0,
                                    total_seconds: stats.total_seconds || 0,
                                    top_genres: genres || [],
                                    top_movies: topMovies || []
                                });
                            }
                        );
                    }
                );
            }
        );
    });
});

// ── Avatar ───────────────────────────────────────────────────────────────────

// Upload avatar
router.post('/avatar', checkUserAuth, uploadAvatar.single('avatar'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    if (!allowedImageTypes.has(req.file.mimetype)) {
        return res.status(400).json({ error: 'Invalid image type' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    db.run(
        `UPDATE users SET avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [avatarUrl, req.session.userId],
        (err) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.json({ success: true, avatar: avatarUrl });
        }
    );
});

// Get avatar for any user by id (used by nav)
router.get('/avatar', checkUserAuth, (req, res) => {
    db.get(`SELECT avatar FROM users WHERE id = ?`, [req.session.userId], (err, row) => {
        if (err || !row) return res.json({ avatar: null });
        res.json({ avatar: row.avatar });
    });
});

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || (err.message && err.message.includes('Only JPG, PNG, or WEBP'))) {
        return res.status(400).json({ error: err.message });
    }
    return next(err);
});

module.exports = router;
