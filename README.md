# TaskCombinator 🚀

A comprehensive team collaboration and task management platform that enables teams to organize, track, and manage tasks efficiently in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.3.1-blue)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure user registration and login with Firebase Authentication
- **Team Management**: Create, join, and manage teams with role-based access control
- **Task Management**:
  - Create, update, delete, and assign tasks
  - Set priorities and due dates
  - Track task status and progress
  - Filter and sort tasks
- **Real-time Updates**: Instant synchronization across team members
- **User Profiles**: Customizable user profiles with avatar support
- **Responsive Design**: Optimized for desktop and mobile devices
- **Email Notifications**: Automated email notifications for task assignments and updates

## 🛠️ Tech Stack

### Frontend

- **React** (18.3.1) - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **Framer Motion** - Animation library
- **Firebase** - Authentication
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Clerk SDK** - User management
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **MailerSend** - Email service

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mukul-raii/TaskCombinator.git
   cd TaskCombinator
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d

# Firebase Admin
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Service
MAILERSEND_API_KEY=your_mailersend_api_key
EMAIL_FROM=your_sender_email

# Clerk (Optional)
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# CORS
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# API Configuration
VITE_API_URL=http://localhost:8000/api/v1
```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend server will run on `http://localhost:8000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
TaskCombinator/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # Database schemas
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Custom middleware
│   │   ├── utils/             # Helper functions
│   │   ├── db/                # Database configuration
│   │   ├── app.js             # Express app setup
│   │   └── index.js           # Entry point
│   ├── package.json
│   └── vercel.json            # Vercel deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   ├── services/          # API services
│   │   ├── lib/               # Utility functions
│   │   └── assets/            # Static assets
│   ├── firebase/              # Firebase configuration
│   ├── package.json
│   └── vercel.json            # Vercel deployment config
│
├── LICENSE
└── README.md
```

## 📚 API Documentation

### Base URL

```
Production: https://taskcombinator.vercel.app/api/v1
Development: http://localhost:8000/api/v1
```

### Endpoints

#### User Routes (`/api/v1/user`)

- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile (Protected)
- `PUT /profile` - Update user profile (Protected)
- `POST /logout` - User logout (Protected)

#### Team Routes (`/api/v1/team`)

- `POST /create` - Create a new team (Protected)
- `GET /` - Get all user teams (Protected)
- `GET /:teamId` - Get team details (Protected)
- `POST /join` - Join a team (Protected)
- `PUT /:teamId` - Update team (Protected)
- `DELETE /:teamId` - Delete team (Protected)

#### Task Routes (`/api/v1/task`)

- `POST /create` - Create a new task (Protected)
- `GET /team/:teamId` - Get all tasks for a team (Protected)
- `GET /:taskId` - Get task details (Protected)
- `PUT /:taskId` - Update task (Protected)
- `DELETE /:taskId` - Delete task (Protected)
- `PUT /:taskId/assign` - Assign task to user (Protected)
- `PUT /:taskId/status` - Update task status (Protected)

### Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🌐 Deployment

### Frontend & Backend (Vercel)

Both frontend and backend are configured for Vercel deployment:

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend**

   ```bash
   cd backend
   vercel
   ```

3. **Deploy Frontend**

   ```bash
   cd frontend
   vercel
   ```

4. **Configure Environment Variables**
   - Add all environment variables in the Vercel dashboard for each deployment
   - Update CORS settings in backend to include production frontend URL

### Production URL

- Frontend: `https://taskcombinator.vercel.app`
- Backend: Configure your backend URL and update in frontend environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style

- Follow existing code conventions
- Use ESLint for JavaScript linting
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mukul Rai** - [Mukul-raii](https://github.com/Mukul-raii)

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB for database solutions
- Vercel for hosting
- All contributors and users of this project

## 📧 Contact

For questions or support, please open an issue or contact:

- GitHub: [@Mukul-raii](https://github.com/Mukul-raii)

---

<div align="center">
  Made with ❤️ by the TaskCombinator Team
</div>
