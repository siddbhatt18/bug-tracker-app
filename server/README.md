# Bug Tracker - Server

RESTful API backend for the Bug Tracker application, built with Node.js, Express, and MongoDB. Provides authentication, project management, ticket tracking, and comment functionality.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **User Management** - Registration and login endpoints
- **Project CRUD** - Full project management capabilities
- **Ticket System** - Create, update, delete, and filter tickets
- **Comments** - Add and retrieve ticket comments
- **Data Validation** - Input validation and error handling
- **CORS Support** - Cross-origin resource sharing enabled
- **MongoDB Integration** - Mongoose ODM for database operations

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-restart

## 📋 Prerequisites

- Node.js (>= 18.0.0)
- MongoDB (local or MongoDB Atlas)
- npm (>= 6.0.0)

## 🔧 Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bugtracker
JWT_SECRET=your_super_secret_jwt_key_here
```

## 🚀 Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── models/
│   ├── User.js           # User schema
│   ├── Project.js        # Project schema
│   ├── Ticket.js         # Ticket schema
│   └── Comment.js        # Comment schema
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── projects.js       # Project management routes
│   ├── tickets.js        # Ticket management routes
│   └── comments.js       # Comment routes
├── server.js             # Application entry point
├── package.json
└── .env                  # Environment variables (not in repo)
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the `x-auth-token` header.

### Token Lifecycle
- **Expiration**: 1 hour
- **Header Name**: `x-auth-token`
- **Format**: Bearer token

## 📚 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth
x-auth-token: <your-jwt-token>
```

### Project Routes

#### Create Project
```http
POST /api/projects
x-auth-token: <your-jwt-token>
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Complete overhaul of company website"
}
```

#### Get All Projects
```http
GET /api/projects
x-auth-token: <your-jwt-token>
```

#### Get Single Project
```http
GET /api/projects/:id
x-auth-token: <your-jwt-token>
```

#### Update Project
```http
PUT /api/projects/:id
x-auth-token: <your-jwt-token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
x-auth-token: <your-jwt-token>
```

### Ticket Routes

#### Create Ticket
```http
POST /api/tickets
x-auth-token: <your-jwt-token>
Content-Type: application/json

{
  "title": "Fix login bug",
  "description": "Users cannot login with special characters in password",
  "projectId": "507f1f77bcf86cd799439011",
  "priority": "High",
  "status": "To Do"
}
```

#### Get Project Tickets (with filters)
```http
GET /api/tickets/project/:projectId?priority=High&search=login
x-auth-token: <your-jwt-token>
```

**Query Parameters:**
- `priority` - Filter by priority (High, Medium, Low, All)
- `search` - Search tickets by title

#### Update Ticket
```http
PUT /api/tickets/:id
x-auth-token: <your-jwt-token>
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "Medium",
  "assignee": "507f1f77bcf86cd799439012"
}
```

#### Delete Ticket
```http
DELETE /api/tickets/:id
x-auth-token: <your-jwt-token>
```

### Comment Routes

#### Get Ticket Comments
```http
GET /api/comments/:ticketId
x-auth-token: <your-jwt-token>
```

#### Add Comment
```http
POST /api/comments/:ticketId
x-auth-token: <your-jwt-token>
Content-Type: application/json

{
  "content": "This has been fixed in the latest commit"
}
```

## 📊 Database Schema

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Project
```javascript
{
  name: String (required),
  description: String,
  owner: ObjectId (ref: User),
  members: [ObjectId (ref: User)],
  createdAt: Date (default: now)
}
```

### Ticket
```javascript
{
  title: String (required),
  description: String (required),
  status: String (enum: ['To Do', 'In Progress', 'Done']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  project: ObjectId (ref: Project, required),
  assignee: ObjectId (ref: User),
  submitter: ObjectId (ref: User, required),
  createdAt: Date (default: now)
}
```

### Comment
```javascript
{
  content: String (required),
  ticket: ObjectId (ref: Ticket, required),
  user: ObjectId (ref: User, required),
  createdAt: Date (default: now)
}
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/bugtracker` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |

## 🛡️ Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based auth
- **CORS Protection** - Configured CORS policies
- **Input Validation** - Mongoose schema validation
- **Authorization Checks** - Owner/member verification

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

| Code | Description |
|------|-------------|
| `200` | Success |
| `400` | Bad Request (validation error) |
| `401` | Unauthorized (invalid/missing token) |
| `404` | Not Found |
| `500` | Server Error |

**Example Error Response:**
```json
{
  "msg": "Invalid Credentials"
}
```

## 🔄 API Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success"
}
```

### Error Response
```json
{
  "msg": "Error message here"
}
```

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your IP address
3. Create a database user
4. Get your connection string
5. Update `MONGO_URI` in your environment variables

### Deployment Platforms
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS EC2**

## 📈 Performance Optimization

- **Mongoose Indexing** - Indexes on email (unique)
- **Connection Pooling** - MongoDB connection reuse
- **Lean Queries** - Use `.lean()` for read-heavy operations
- **Population** - Selective field population

## 🐛 Debugging

Enable detailed error logging:
```javascript
// In server.js
mongoose.set('debug', true);
```

## 🔧 Maintenance

### Database Backup
```bash
mongodump --uri="mongodb://localhost:27017/bugtracker" --out=/backup/
```

### Database Restore
```bash
mongorestore --uri="mongodb://localhost:27017/bugtracker" /backup/bugtracker/
```

## 📄 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue in the repository.

## 🙏 Acknowledgments

- Express.js community
- Mongoose documentation
- MongoDB Atlas
- JWT.io
