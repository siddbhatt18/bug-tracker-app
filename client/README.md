# Bug Tracker - Client

A modern, responsive bug tracking application built with React, featuring drag-and-drop Kanban boards, real-time notifications, and seamless project management.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **Project Management** - Create, edit, and delete projects
- **Kanban Board** - Drag-and-drop ticket management with status columns
- **Ticket System** - Create, update, and delete tickets with priority levels
- **Real-time Comments** - Add and view comments on tickets
- **Search & Filters** - Filter tickets by priority and search by title
- **Responsive Design** - Fully responsive UI with mobile sidebar support
- **Toast Notifications** - User-friendly feedback for all actions

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag and drop functionality
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

## 📋 Prerequisites

- Node.js (>= 20.19.0)
- npm (>= 8.0.0)

## 🔧 Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client root:
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── KanbanBoard.jsx
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Spinner.jsx
│   │   ├── TicketCard.jsx
│   │   └── TicketModal.jsx
│   ├── context/         # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Project.jsx
│   │   └── Register.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .eslintrc.config.js  # ESLint configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── package.json
```

## 🎯 Key Components

### Authentication
- **Login/Register** - User authentication pages
- **AuthContext** - Global authentication state management
- **Protected Routes** - Route guards for authenticated users

### Dashboard
- **Project Cards** - Visual project overview with CRUD operations
- **Project Creation** - Quick project creation form

### Kanban Board
- **Drag & Drop** - Move tickets between status columns
- **Status Columns** - To Do, In Progress, Done
- **Ticket Cards** - Display ticket information with priority badges

### Ticket Modal
- **View Mode** - Display ticket details and comments
- **Edit Mode** - Inline ticket editing
- **Comments** - Add and view ticket comments
- **Actions** - Delete and update tickets

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

## 🎨 Styling

The application uses Tailwind CSS for styling with custom configurations:
- Responsive breakpoints (sm, md, lg, xl)
- Custom color scheme
- Utility-first approach
- Dark mode ready

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 API Integration

The client communicates with the backend API using Axios. The base URL is configured in `src/main.jsx`:

```javascript
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

All API requests include the authentication token in the `x-auth-token` header when available.

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Collapsible Sidebar** - Mobile-friendly navigation
- **Adaptive Layouts** - Flex and grid layouts adjust to screen size
- **Touch Friendly** - Large tap targets for mobile users

## 🚧 Future Enhancements

- [ ] Team member management
- [ ] Analytics dashboard
- [ ] File attachments for tickets
- [ ] Email notifications
- [ ] Advanced filtering options
- [ ] Dark mode toggle
- [ ] Ticket history/activity log

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- None at the moment

## 📞 Support

For support, please open an issue in the repository.
