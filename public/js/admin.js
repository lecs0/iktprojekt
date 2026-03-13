// Admin dashboard script

let currentMovie = null;

// Check authentication on load
window.addEventListener('load', async () => {
    const response = await fetch('/api/auth/status');
    const data = await response.json();
    
    if (!data.authenticated) {
        showLoginModal();
    } else {
        loadDashboard();
    }
});

// Load statistics
async function loadStats() {
    try {
        const moviesResponse = await fetch('/api/movies');
        const movies = await moviesResponse.json();
        document.getElementById('total-movies').textContent = movies.length;

        const usersResponse = await fetch('/api/admin/users');
        const users = await usersResponse.json();
        document.getElementById('total-users').textContent = users.length;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Login Modal
function showLoginModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: rgba(31, 31, 31, 0.95);
        padding: 2rem;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 400px;
        width: 90%;
    `;

    modal.innerHTML = `
        <h2 style="color: #a78bfa; margin-bottom: 1.5rem;">Admin Login</h2>
        <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" id="login-username" placeholder="Username" required style="
                padding: 0.8rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(20, 20, 20, 0.9);
                color: #f3f4f6;
                border-radius: 8px;
            ">
            <input type="password" id="login-password" placeholder="Password" required style="
                padding: 0.8rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(20, 20, 20, 0.9);
                color: #f3f4f6;
                border-radius: 8px;
            ">
            <button type="submit" style="
                padding: 0.8rem;
                background: rgba(167, 139, 250, 1);
                color: #111827;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s;
            ">Login</button>
        </form>
        <p id="login-error" style="color: #f87171; font-size: 0.85rem; margin-top: 1rem; display: none;"></p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');

        errorEl.style.display = 'none';
        errorEl.textContent = '';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                overlay.remove();
                loadDashboard();
            } else {
                errorEl.textContent = data.error || 'Invalid credentials';
                errorEl.style.display = 'block';
            }
        } catch (error) {
            errorEl.textContent = 'Could not reach server. Try again.';
            errorEl.style.display = 'block';
        }
    });
}

// Load dashboard
async function loadDashboard() {
    loadStats();
    setupNavigation();

    const refreshLogsBtn = document.getElementById('refresh-logs-btn');
    if (refreshLogsBtn) {
        refreshLogsBtn.addEventListener('click', loadActivityLogs);
    }
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch('/api/movies');
        const movies = await response.json();
        document.getElementById('total-movies').textContent = movies.length;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.classList.contains('logout')) {
            link.addEventListener('click', logout);
        } else {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                switchSection(section);
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        }
    });
}

// Switch section
function switchSection(section) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    if (section === 'movies-list') {
        loadMoviesList();
    } else if (section === 'users-list') {
        loadUsersList();
    } else if (section === 'activity-log') {
        loadActivityLogs();
    }
}

async function loadActivityLogs() {
    try {
        const response = await fetch('/api/admin/logs?limit=100');
        const logs = await response.json();

        const container = document.getElementById('logs-table-container');
        if (!container) return;

        if (!Array.isArray(logs) || logs.length === 0) {
            container.innerHTML = '<p class="empty-log">No activity recorded yet.</p>';
            return;
        }

        let html = `
            <table class="movies-table logs-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Admin</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>IP</th>
                    </tr>
                </thead>
                <tbody>
        `;

        logs.forEach((log) => {
            const createdDate = new Date(log.created_at).toLocaleString();
            html += `
                <tr>
                    <td>${createdDate}</td>
                    <td>${log.admin_username || '-'}</td>
                    <td><span class="log-action-tag">${log.action || '-'}</span></td>
                    <td class="log-details">${log.details || '-'}</td>
                    <td>${log.ip_address || '-'}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading activity logs:', error);
        const container = document.getElementById('logs-table-container');
        if (container) {
            container.innerHTML = '<p class="empty-log">Failed to load logs.</p>';
        }
    }
}

// Add movie form
document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('add-movie-form');
    if (movieForm) {
        movieForm.addEventListener('submit', addMovie);
    }

    const userForm = document.getElementById('add-user-form');
    if (userForm) {
        userForm.addEventListener('submit', addUser);
    }
});

async function addMovie(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const response = await fetch('/api/admin/movies', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert('Movie added successfully');
            e.target.reset();
            loadStats();
            switchSection('movies-list');
        } else {
            alert('Error adding movie');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding movie');
    }
}

// Load movies list
async function loadMoviesList() {
    try {
        const response = await fetch('/api/admin/movies');
        const movies = await response.json();

        const container = document.getElementById('movies-table-container');
        
        if (movies.length === 0) {
            container.innerHTML = '<p>No movies yet</p>';
            return;
        }

        let html = `
            <table class="movies-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        movies.forEach(movie => {
            html += `
                <tr>
                    <td>${movie.title}</td>
                    <td>${movie.genre || '-'}</td>
                    <td>${movie.release_year || '-'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editMovie(${movie.id})">Edit</button>
                            <button class="btn-delete" onclick="deleteMovie(${movie.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

function closeEditMovieModal() {
    const existing = document.getElementById('edit-movie-overlay');
    if (existing) {
        existing.remove();
    }
    currentMovie = null;
}

function showEditMovieModal(movie) {
    closeEditMovieModal();
    currentMovie = movie;

    const overlay = document.createElement('div');
    overlay.id = 'edit-movie-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3500;
        padding: 1rem;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        width: min(780px, 96vw);
        max-height: 92vh;
        overflow-y: auto;
        background: rgba(20, 20, 20, 0.98);
        border: 1px solid rgba(167, 139, 250, 0.35);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    `;

    modal.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1rem;">
            <h2 style="color:#a78bfa;margin:0;">Edit Movie</h2>
            <button type="button" id="close-edit-movie-btn" style="background:transparent;border:1px solid rgba(255,255,255,0.15);color:#d1d5db;padding:0.4rem 0.7rem;border-radius:6px;cursor:pointer;">✕</button>
        </div>

        <form id="edit-movie-form" class="movie-form" style="max-width:none;background:transparent;border:none;padding:0;">
            <input type="hidden" name="movie_id" value="${movie.id || ''}">
            <input type="hidden" name="poster_img" value="${movie.poster_img || ''}">

            <div class="form-group">
                <label>Title *</label>
                <input type="text" name="title" required value="${movie.title || ''}">
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="4">${movie.description || ''}</textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Genre</label>
                    <input type="text" name="genre" value="${movie.genre || ''}">
                </div>
                <div class="form-group">
                    <label>Release Year</label>
                    <input type="number" name="release_year" value="${movie.release_year || ''}">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" name="duration" value="${movie.duration || ''}">
                </div>
                <div class="form-group">
                    <label>Country</label>
                    <input type="text" name="country" value="${movie.country || ''}">
                </div>
            </div>

            <div class="form-group">
                <label>Director</label>
                <input type="text" name="director" value="${movie.director || ''}">
            </div>

            <div class="form-group">
                <label>Cast</label>
                <input type="text" name="cast" value="${movie.cast || ''}">
            </div>

            <div class="form-group">
                <label>Rating (0-10)</label>
                <input type="number" name="rating" min="0" max="10" step="0.1" value="${movie.rating || ''}">
            </div>

            <div class="form-group">
                <label>Current Poster</label>
                <div style="display:flex;align-items:center;gap:1rem;">
                    ${movie.poster_img ? `<img src="${movie.poster_img}" alt="Poster" style="width:74px;height:110px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.15);">` : '<span style="color:#9ca3af;font-size:0.9rem;">No poster</span>'}
                    <input type="file" name="poster" accept="image/jpeg,image/png,image/webp">
                </div>
            </div>

            <div class="form-group">
                <label>Video Link (VK, YouTube, etc)</label>
                <input type="url" name="video_link" value="${movie.video_link || ''}">
            </div>

            <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1rem;">
                <button type="button" id="cancel-edit-movie-btn" class="btn-delete" style="background:#374151;">Cancel</button>
                <button type="submit" class="btn-primary">Save Changes</button>
            </div>
        </form>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('close-edit-movie-btn').addEventListener('click', closeEditMovieModal);
    document.getElementById('cancel-edit-movie-btn').addEventListener('click', closeEditMovieModal);

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeEditMovieModal();
        }
    });

    document.getElementById('edit-movie-form').addEventListener('submit', saveEditedMovie);
}

// Edit movie
async function editMovie(id) {
    try {
        const response = await fetch(`/api/admin/movies/${id}`);
        const movie = await response.json();

        if (!response.ok) {
            alert(movie.error || 'Failed to load movie details');
            return;
        }

        showEditMovieModal(movie);
    } catch (error) {
        console.error('Error loading movie for edit:', error);
        alert('Error loading movie');
    }
}

async function saveEditedMovie(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const movieIdFromForm = Number.parseInt(formData.get('movie_id'), 10);
    const movieId = Number.isFinite(movieIdFromForm) && movieIdFromForm > 0
        ? movieIdFromForm
        : (currentMovie && currentMovie.id ? currentMovie.id : 0);

    if (!movieId) {
        alert('No movie selected');
        return;
    }

    try {
        const response = await fetch(`/api/admin/movies/${movieId}`, {
            method: 'PUT',
            body: formData
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            alert(data.error || 'Error updating movie');
            return;
        }

        closeEditMovieModal();
        loadMoviesList();
        loadStats();
        alert('Movie updated successfully');
    } catch (error) {
        console.error('Error updating movie:', error);
        alert('Error updating movie');
    }
}

// Delete movie
async function deleteMovie(id) {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    try {
        const response = await fetch(`/api/admin/movies/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            alert('Movie deleted');
            loadMoviesList();
            loadStats();
        } else {
            alert('Error deleting movie');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting movie');
    }
}

// Logout
async function logout(e) {
    e.preventDefault();
    
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
}

// ===== USER MANAGEMENT =====

// Add user
async function addUser(e) {
    e.preventDefault();

    const username = e.target.elements['username'].value;
    const email = e.target.elements['email'].value;

    try {
        const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        });

        const data = await response.json();

        if (data.success) {
            showTempPasswordModal(data.username, data.tempPassword);
            e.target.reset();
            loadStats();
            loadUsersList();
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating user');
    }
}

// Load users list
async function loadUsersList() {
    try {
        const response = await fetch('/api/admin/users');
        const users = await response.json();

        const container = document.getElementById('users-table-container');
        
        if (users.length === 0) {
            container.innerHTML = '<p>No users yet</p>';
            return;
        }

        let html = `
            <table class="movies-table" style="margin-top: 2rem;">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        users.forEach(user => {
            const passwordStatus = user.must_change_password ? '⚠️ Needs Change' : '✅ Changed';
            const createdDate = new Date(user.created_at).toLocaleDateString();
            
            html += `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${passwordStatus}</td>
                    <td>${createdDate}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="resetUserPassword(${user.id})">Reset Password</button>
                            <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Reset user password
async function resetUserPassword(id) {
    if (!confirm('Reset this user\'s password? They will need to login with the new temporary password.')) return;

    try {
        const response = await fetch(`/api/admin/users/${id}/reset-password`, {
            method: 'POST'
        });

        const data = await response.json();

        if (data.success) {
            showTempPasswordModal('Password Reset', data.tempPassword);
            loadUsersList();
        } else {
            alert('Error resetting password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error resetting password');
    }
}

// Show temp password in copyable modal
function showTempPasswordModal(username, tempPassword) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        padding: 2rem;
        border-radius: 10px;
        border: 2px solid rgba(16, 185, 129, 0.5);
        max-width: 450px;
        width: 90%;
    `;

    const passwordId = 'temp-password-' + Date.now();

    modal.innerHTML = `
        <h2 style="color: #10b981; margin-bottom: 1rem;">✅ User Created Successfully</h2>
        <p style="color: #d1d5db; margin-bottom: 1.5rem;">Share the temporary password below with the user:</p>
        
        <div style="background: rgba(15, 15, 16, 0.8); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 1rem; margin-bottom: 1.5rem;">
            <p style="color: #9ca3af; font-size: 0.85rem; margin-bottom: 0.5rem;">Username:</p>
            <p style="color: #10b981; font-size: 1.1rem; font-weight: bold; margin-bottom: 1rem;">${username}</p>
            
            <p style="color: #9ca3af; font-size: 0.85rem; margin-bottom: 0.5rem;">Temporary Password:</p>
            <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="${passwordId}" value="${tempPassword}" readonly style="
                    flex: 1;
                    padding: 0.75rem;
                    background: rgba(30, 30, 30, 0.9);
                    border: 1px solid rgba(16, 185, 129, 0.4);
                    color: #10b981;
                    border-radius: 4px;
                    font-family: monospace;
                    font-weight: bold;
                    font-size: 1rem;
                ">
                <button onclick="document.getElementById('${passwordId}').select(); document.execCommand('copy'); this.textContent='✓ Copied!'; setTimeout(() => this.textContent='Copy', 2000);" style="
                    padding: 0.75rem 1rem;
                    background: rgba(16, 185, 129, 0.9);
                    color: #0f0f10;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                ">Copy</button>
            </div>
        </div>
        
        <p style="color: #fca5a5; font-size: 0.85rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 4px; padding: 0.75rem; margin-bottom: 1.5rem;">
            ⚠️ The user can login with <strong>any password</strong> on first login, then must set their own password.
        </p>
        
        <button onclick="this.closest('div').parentElement.remove();" style="
            width: 100%;
            padding: 0.8rem;
            background: rgba(167, 139, 250, 0.9);
            color: #111827;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        ">Close</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

// Delete user
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            alert('User deleted');
            loadUsersList();
            loadStats();
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting user');
    }
}