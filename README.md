# RatZ Streaming Platform

A full-featured streaming platform with admin panel, built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

- ✅ **Movie Listing** - Browse all movies with beautiful responsive UI
- ✅ **Search** - Search movies by title, genre, and description
- ✅ **Movie Details** - Full movie information and embedded video player
- ✅ **Admin Panel** - Add, edit, and delete movies
- ✅ **Image Upload** - Upload custom movie posters
- ✅ **Authentication** - Secure admin login
- ✅ **Database** - SQLite for movie storage
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **File Upload**: Multer
- **Authentication**: bcryptjs + Sessions

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The application will run on `http://localhost:3000`

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

**Change these immediately in production!**

## Usage

### Public Site

- Visit `http://localhost:3000` to browse movies
- Use the search bar to find movies
- Click any movie to see details and watch

### Admin Panel

- Visit `http://localhost:3000/admin` to access the dashboard
- Login with default credentials
- Add new movies with poster images and video links
- Manage existing movies (edit/delete)

## Project Structure

```
/
├── backend/
│   ├── server.js          # Express server setup
│   ├── db.js              # Database initialization
│   └── routes/
│       ├── auth.js        # Authentication routes
│       ├── movies.js      # Movie listing routes
│       └── admin.js       # Admin CRUD routes
├── public/
│   ├── index.html         # Main page
│   ├── movie.html         # Movie detail page
│   ├── admin/
│   │   └── dashboard.html # Admin dashboard
│   ├── css/
│   │   ├── style.css      # Main styles
│   │   └── admin.css      # Admin styles
│   ├── js/
│   │   ├── app.js         # Main app logic
│   │   ├── movie-detail.js # Movie detail logic
│   │   └── admin.js       # Admin logic
│   ├── uploads/           # User uploaded images
│   └── imgs/              # Static images
├── package.json
├── .env
└── ratz.db               # SQLite database (created on first run)
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/status` - Check auth status

### Movies (Public)
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `GET /api/movies/search?q=query` - Search movies

### Admin
- `POST /api/admin/movies` - Create movie (multipart/form-data)
- `PUT /api/admin/movies/:id` - Update movie
- `DELETE /api/admin/movies/:id` - Delete movie
- `GET /api/admin/movies` - Get all movies (admin)

## Adding Movies

1. Go to Admin Panel (`/admin`)
2. Login with credentials
3. Click "Add Movie"
4. Fill in movie details:
   - Title (required)
   - Description
   - Genre
   - Release Year
   - Duration (in minutes)
   - Country
   - Director
   - Cast
   - Rating (0-10)
   - Poster Image (upload or URL)
   - Video Link (VK, YouTube, Vimeo embed URL)
5. Click "Add Movie"
6. View on homepage

## Video Link Format

For VK videos, use the embed link:
```
https://vk.com/video_ext.php?oid=-XXXXX&id=XXXXX&hash=XXXXX&hd=3
```

For YouTube, use the embed link:
```
https://www.youtube.com/embed/VIDEO_ID
```

## Security Notes

- Change the default admin password immediately
- Use HTTPS in production
- Add rate limiting for login attempts
- Consider adding CSRF protection
- Validate and sanitize all inputs

## Future Enhancements

- [ ] User accounts and watchlist
- [ ] Movie ratings and reviews
- [ ] Multiple admin users
- [ ] Email notifications
- [ ] Streaming quality settings
- [ ] Download feature
- [ ] Social sharing
- [ ] Analytics dashboard

## License

MIT License - Feel free to use this for your project!

## Support

For issues or questions, check the code or modify as needed. This is a fully open codebase meant to be customized.