# Me-API Playground

A full-stack web application for managing user profiles with a beautiful, modern UI. This project demonstrates a complete API-backed profile management system with authentication, search capabilities, pagination, rate limiting, and comprehensive testing.

## 🚀 Features

### Frontend Features
- **Modern UI Design**: Beautiful, responsive interface built with Tailwind CSS and glassmorphism effects
- **Profile Management**: View, edit, and create user profiles with an intuitive interface
- **Skill Search**: Search for users by skills with pagination support
- **Project Display**: Showcase user projects with links and descriptions
- **Real-time Updates**: Dynamic profile updates without page refresh
- **Authentication UI**: Optional admin password authentication for protected operations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Backend Features
- **RESTful API**: Clean, well-structured API endpoints
- **JWT Authentication**: Optional JWT-based authentication for profile modifications
- **Rate Limiting**: Protection against abuse with configurable rate limits (100 requests per 15 minutes)
- **Pagination**: Efficient data retrieval with pagination support for search results
- **Request Logging**: Comprehensive logging for debugging and monitoring
- **MongoDB Integration**: Robust database operations with Mongoose ODM
- **Error Handling**: Proper error handling and validation
- **CI/CD**: Automated testing with GitHub Actions

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Authentication](#authentication)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js 5.2**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JSON Web Tokens (JWT)**: Authentication
- **express-rate-limit**: Rate limiting middleware
- **dotenv**: Environment variable management
- **CORS**: Cross-origin resource sharing

### Frontend
- **Next.js 16**: React framework
- **React 19**: UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **ESLint**: Code linting

### Development Tools
- **Nodemon**: Development server auto-reload
- **GitHub Actions**: CI/CD pipeline
- **Node Test Runner**: Built-in testing framework

## 📁 Project Structure

```
Api-play/
├── server/                    # Backend application
│   ├── config/               # Configuration files
│   │   └── db.js             # MongoDB connection
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.js
│   │   ├── health.controller.js
│   │   └── profile.controller.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.middleware.js
│   ├── models/              # Database models
│   │   └── Profile.model.js
│   ├── routes/              # API routes
│   │   ├── auth.routes.js
│   │   ├── health.routes.js
│   │   └── profile.routes.js
│   ├── tests/               # Test files
│   │   ├── auth.middleware.test.js
│   │   └── search.pagination.test.js
│   ├── app.js              # Express app configuration
│   ├── index.js            # Server entry point
│   └── package.json        # Dependencies
│
├── frontend/                # Frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   └── app/
│   │       ├── components/ # React components
│   │       │   ├── AddUser.js
│   │       │   ├── EditProfile.js
│   │       │   ├── ProfileCard.js
│   │       │   ├── ProjectList.js
│   │       │   └── SkillSearch.js
│   │       ├── services/   # API service functions
│   │       │   └── api.js
│   │       ├── globals.css # Global styles
│   │       ├── layout.js   # Root layout
│   │       └── page.js     # Home page
│   ├── package.json
│   └── next.config.mjs
│
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
│
├── .gitignore             # Git ignore rules
└── README.md             # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Api-play
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/api-playground
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/api-playground

# JWT Authentication (Optional - leave empty to disable auth)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_PASSWORD=your-admin-password-here

# CORS Origin (Frontend URL)
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Running the Project

### Development Mode

#### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

#### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`.

### Production Mode

#### Build and Start Backend

```bash
cd server
npm start
```

#### Build and Start Frontend

```bash
cd frontend
npm run build
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "password": "your-admin-password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Profile Endpoints

#### Get Profile
```http
GET /api/profile
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "education": "Computer Science",
  "skills": ["JavaScript", "React", "Node.js"],
  "projects": [
    {
      "title": "My Project",
      "description": "Project description",
      "links": ["https://example.com"]
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Create/Update Profile
```http
POST /api/profile
Authorization: Bearer <token> (optional if auth not configured)
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "education": "Software Engineering",
  "skills": ["Python", "Django"],
  "projects": []
}
```

**Note:** If a profile with the same email exists, it will be updated (upsert).

#### Update Profile
```http
PUT /api/profile
PUT /api/profile/:id
Authorization: Bearer <token> (optional if auth not configured)
Content-Type: application/json

{
  "name": "Updated Name",
  "skills": ["New Skill"]
}
```

### Search Endpoints

#### Search by Skill
```http
GET /api/search?skill=react&page=1&limit=10
```

**Query Parameters:**
- `skill` (required): Skill to search for
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10, max: 50): Results per page

**Response:**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "skills": ["React", "JavaScript"]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

### Health Check

```http
GET /
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 Frontend Components

### ProfileCard
Displays user profile information with an edit button. Shows:
- User avatar (initials)
- Name and education
- Email (clickable mailto link)
- Skills as badges
- Edit button for profile modification

### EditProfile
Modal component for editing profile details:
- Admin password field (optional)
- Name, email, education fields
- Dynamic skill management (add/remove)
- Form validation
- Error handling

### AddUser
Modal component for creating new profiles:
- Admin password field (optional)
- All profile fields
- Dynamic skill and project management
- Form validation

### SkillSearch
Search component with pagination:
- Skill input field
- Search results display
- Pagination controls (Previous/Next)
- Loading states
- Error handling

### ProjectList
Displays user projects:
- Project cards with title and description
- Clickable project links
- Empty state handling

## 🔐 Authentication

### Optional Authentication

Authentication is **optional** in this project:

- **If `ADMIN_PASSWORD` and `JWT_SECRET` are NOT set**: All endpoints work without authentication
- **If `ADMIN_PASSWORD` and `JWT_SECRET` ARE set**: Protected endpoints require a valid JWT token

### Protected Endpoints

When authentication is enabled, these endpoints require a Bearer token:
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/:id` - Update profile by ID

### Getting a Token

1. Send a POST request to `/api/auth/login` with the admin password
2. Receive a JWT token (valid for 2 hours)
3. Include the token in the `Authorization` header: `Bearer <token>`

### Frontend Authentication Flow

1. User enters admin password in the edit/add form
2. Frontend calls `/api/auth/login` with the password
3. Token is stored in `localStorage` as `me_api_token`
4. Subsequent requests include the token automatically
5. Token expires after 2 hours

## 🧪 Testing

### Running Tests

```bash
cd server
npm test
```

### Test Files

- `tests/auth.middleware.test.js`: Tests JWT authentication middleware
- `tests/search.pagination.test.js`: Tests pagination functionality

### Writing Tests

Tests use Node.js built-in test runner. Example:

```javascript
import { test } from "node:test";
import assert from "node:assert";

test("should pass", () => {
  assert.strictEqual(1 + 1, 2);
});
```

## 🔄 CI/CD

### GitHub Actions Workflow

The project includes a CI/CD pipeline (`.github/workflows/ci.yml`) that:

1. Runs on every push and pull request
2. Uses Node.js 20
3. Installs dependencies
4. Runs tests

### Manual CI Steps

```bash
cd server
npm install
npm test
```

## 📊 Rate Limiting

The API implements rate limiting to prevent abuse:

- **Limit**: 100 requests per 15 minutes per IP address
- **Scope**: All `/api/*` routes
- **Headers**: Standard rate limit headers included in responses

## 📝 Logging

All API requests are logged with:
- HTTP method
- Request URL
- Response status code
- Response time in milliseconds

Example log:
```
GET /api/profile -> 200 (45ms)
POST /api/profile -> 201 (123ms)
```

## 🚢 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Run `npm start` in production mode

### Frontend Deployment

#### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy automatically on push

#### Other Platforms

```bash
cd frontend
npm run build
npm start
```

### Environment Variables for Production

Ensure these are set:
- `MONGO_URI`: Production MongoDB connection string
- `JWT_SECRET`: Strong, random secret key
- `ADMIN_PASSWORD`: Secure admin password
- `CORS_ORIGIN`: Your frontend domain
- `PORT`: Server port (if not using default)

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
- Verify `MONGO_URI` is correct
- Check MongoDB is running (if local)
- Verify network access (if Atlas)

#### CORS Errors
- Ensure `CORS_ORIGIN` matches your frontend URL
- Check browser console for specific CORS errors

#### Authentication Not Working
- Verify `JWT_SECRET` and `ADMIN_PASSWORD` are set
- Check token expiration (2 hours)
- Verify token is included in Authorization header

#### Frontend Can't Connect to API
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend server is running
- Check CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint rules for frontend code
- Use consistent naming conventions
- Add comments for complex logic
- Write tests for new features

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- Next.js team for the React framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the database solution

## 📞 Support

For support, email suyashp271@gmail.com or open an issue in the repository.

---

**Made with ❤️ using Node.js, Express, Next.js, and Tailwind CSS**

