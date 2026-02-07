# 🐛 Bug Tracker Application

A full-stack bug tracking and project management application built with the MERN stack (MongoDB, Express, React, Node.js). Features include drag-and-drop Kanban boards, real-time notifications, user authentication, and comprehensive project management tools.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20.19+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

Bug Tracker is a modern, full-featured project management and issue tracking system designed for development teams. It provides an intuitive interface for managing projects, tracking bugs, and collaborating with team members through comments and status updates.

### Key Highlights

- **Intuitive Kanban Board**: Visual workflow management with drag-and-drop functionality
- **Real-time Updates**: Instant feedback with toast notifications
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **RESTful API**: Well-structured backend with comprehensive endpoints
- **Modern UI**: Beautiful interface built with Tailwind CSS

## ✨ Features

### User Management
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Secure password hashing with bcryptjs
- ✅ Protected routes and middleware
- ✅ User session management

### Project Management
- ✅ Create, read, update, and delete projects
- ✅ Project ownership and member management
- ✅ Project-specific ticket organization
- ✅ Quick project search and filtering

### Ticket System
- ✅ Create tickets with title, description, priority, and status
- ✅ Drag-and-drop status updates (To Do, In Progress, Done)
- ✅ Priority levels (Low, Medium, High)
- ✅ Ticket assignment to team members
- ✅ Advanced filtering by priority and search
- ✅ Edit and delete ticket capabilities
- ✅ Ticket creation timestamps

### Collaboration
- ✅ Comment system on tickets
- ✅ User attribution for comments
- ✅ Real-time comment updates
- ✅ Comment timestamps

### User Interface
- ✅ Responsive Kanban board
- ✅ Collapsible sidebar navigation
- ✅ Toast notifications for user feedback
- ✅ Mobile-friendly design
- ✅ Modern icons with Lucide React
- ✅ Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| React Router DOM | 7.13.0 | Client-side routing |
| Axios | 1.13.4 | HTTP client |
| Tailwind CSS | 3.4.19 | Styling framework |
| @hello-pangea/dnd | 18.0.1 | Drag and drop |
| React Hot Toast | 2.6.0 | Notifications |
| Lucide React | 0.563.0 | Icon library |
| Vite | 7.2.4 | Build tool |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.19.0+ | Runtime environment |
| Express | 5.2.1 | Web framework |
| MongoDB | 7.0+ | Database |
| Mongoose | 9.1.6 | ODM |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |
| CORS | 2.8.6 | Cross-origin support |
| dotenv | 17.2.4 | Environment management |

## 📁 Project Structure

```
bug-tracker-app/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── TicketCard.jsx
│   │   │   └── TicketModal.jsx
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Project.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Backend Node.js application
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── models/               # Mongoose models
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Ticket.js
│   │   └── Comment.js
│   ├── routes/               # Express routes
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tickets.js
│   │   └── comments.js
│   ├── server.js             # Entry point
│   └── package.json
│
└── README.md                  # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.19.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **MongoDB** (v7.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

Check your installations:
```bash
node --version
npm --version
mongod --version  # or mongo --version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bug-tracker-app.git
cd bug-tracker-app
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Server Configuration

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/bugtracker
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bugtracker?retryWrites=true&w=majority

# Security
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Environment
NODE_ENV=development
```

### Client Configuration

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# For production:
# VITE_API_URL=https://your-api-domain.com
```

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

#### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Whitelist your IP address
4. Create database user
5. Get connection string and update `MONGO_URI` in server `.env`

## 🏃 Running the Application

### Development Mode

#### Run Backend Server

```bash
cd server
npm run dev
```
Server will start on `http://localhost:5000`

#### Run Frontend Client

Open a new terminal:

```bash
cd client
npm run dev
```
Client will start on `http://localhost:5173`

### Production Mode

#### Build Client

```bash
cd client
npm run build
```

#### Start Server

```bash
cd server
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get Current User
```http
GET /api/auth
x-auth-token: <jwt-token>
```

### Project Endpoints

```http
GET    /api/projects           # Get all user projects
POST   /api/projects           # Create new project
GET    /api/projects/:id       # Get single project
PUT    /api/projects/:id       # Update project
DELETE /api/projects/:id       # Delete project
```

### Ticket Endpoints

```http
GET    /api/tickets/project/:projectId    # Get all tickets for project
POST   /api/tickets                        # Create new ticket
PUT    /api/tickets/:id                    # Update ticket
DELETE /api/tickets/:id                    # Delete ticket
```

Query Parameters for GET:
- `priority` - Filter by priority (High, Medium, Low, All)
- `search` - Search by title

### Comment Endpoints

```http
GET  /api/comments/:ticketId    # Get all comments for ticket
POST /api/comments/:ticketId    # Add comment to ticket
```

For detailed API documentation, see [server/README.md](./server/README.md)

## 🌐 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Create account** on your chosen platform
2. **Connect repository** or use CLI
3. **Set environment variables**:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`
4. **Deploy** and get your API URL

### Frontend Deployment (Vercel/Netlify)

1. **Update** `VITE_API_URL` to production API URL
2. **Build** the project: `npm run build`
3. **Deploy** the `dist` folder
4. **Configure** redirects for client-side routing:

**Netlify** (`_redirects` file):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Docker Deployment (Optional)

#### Dockerfile for Server
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/bugtracker
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
  
  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

## 🔒 Security Considerations

- **JWT Tokens**: Short expiration times (1 hour)
- **Password Hashing**: bcrypt with salt rounds
- **Environment Variables**: Sensitive data in .env files
- **CORS**: Configured for specific origins
- **Input Validation**: Mongoose schema validation
- **XSS Protection**: React's built-in XSS protection
- **SQL Injection**: MongoDB/Mongoose protections

### Security Best Practices

1. Never commit `.env` files
2. Use strong JWT secrets (32+ characters)
3. Enable HTTPS in production
4. Implement rate limiting
5. Keep dependencies updated
6. Use Content Security Policy headers
7. Implement CSRF protection for forms

## 🧪 Testing

### Run Tests (if implemented)

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test
```

### Manual Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Create project
- [ ] Create ticket
- [ ] Drag ticket between columns
- [ ] Edit ticket
- [ ] Delete ticket
- [ ] Add comment
- [ ] Delete project
- [ ] Logout

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
# macOS/Linux
pgrep mongo

# Start MongoDB if not running
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

#### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

#### CORS Errors
- Ensure `VITE_API_URL` in client `.env` matches server URL
- Check CORS configuration in `server/server.js`

#### JWT Token Issues
- Check token expiration (default: 1 hour)
- Verify `JWT_SECRET` is set in server `.env`
- Clear browser localStorage and login again

## 🚧 Roadmap

### Planned Features

- [ ] Email notifications
- [ ] File attachments for tickets
- [ ] Team member roles (Admin, Developer, Viewer)
- [ ] Advanced analytics dashboard
- [ ] Activity log/audit trail
- [ ] Ticket templates
- [ ] Sprint planning features
- [ ] Time tracking
- [ ] Export reports (PDF, CSV)
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Real-time collaboration (WebSockets)
- [ ] Integration with GitHub/GitLab
- [ ] Mobile app (React Native)

## 👥 Contributing

We welcome contributions! Please follow these steps:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/bug-tracker-app.git
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Make** your changes
5. **Commit** with clear messages:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/AmazingFeature
   ```
7. **Open** a Pull Request

### Code Style

- Follow existing code conventions
- Use meaningful variable names
- Comment complex logic
- Write clean, readable code
- Update documentation for new features

### Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update README if needed

## 📄 License

This project is licensed under the ISC License.

```
ISC License

Copyright (c) 2024

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## 📞 Contact & Support

**Siddharth Bhattacharya**
- GitHub: [@siddbhatt18](https://github.com/siddbhatt18/)
- LinkedIn: [Siddharth Bhattacharya](https://linkedin.com/in/siddharth-bhattacharya-8b9710247/)

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop
- [Lucide Icons](https://lucide.dev/)
- [React Hot Toast](https://react-hot-toast.com/)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

<div align="center">

**Made with ❤️ by developers, for developers**

[Report Bug](https://github.com/yourusername/bug-tracker-app/issues) · [Request Feature](https://github.com/yourusername/bug-tracker-app/issues) · [Documentation](./docs)

</div>
