# MERN Task Manager Assignment

This project is a scalable REST API with Authentication & Role-Based Access, including a basic frontend UI.

## Features

- **User Authentication**: Register and Login with JWT and Password Hashing.
- **Role-Based Access Control**: Admin and User roles.
- **Task Management**: CRUD operations for Tasks.
- **API Documentation**: Swagger UI integrated.
- **Frontend**: React + Tailwind CSS Dashboard.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React (Vite), Tailwind CSS
- **Tools**: Swagger, Postman

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running (or update `MONGO_URI` in `server/.env`)

### Backend Setup
1. Navigate to `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (already created):
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern-assignment
   JWT_SECRET=supersecretkey123
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server runs on `https://primetrade-ai-wheat.vercel.app`.
   API Docs available at `https://primetrade-ai-wheat.vercel.app/api-docs`.

### Frontend Setup
1. Navigate to `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`.

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get all tasks (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## Project Structure

```
/server
  /src
    /config - DB setup
    /controllers - Route logic
    /middleware - Auth & Role checks
    /models - Mongoose schemas
    /routes - API routes
    app.js - App setup
    server.js - Entry point
/client
  /src
    /components - Reusable UI
    /context - Global state (Auth)
    /pages - Views
    /services - API calls
```
