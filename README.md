# User Authentication System

A production-ready full-stack authentication system built with Node.js, Express, MongoDB, JWT, and React using the "Sleek Interface" design theme.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS (Sleek Theme), React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas using Mongoose
- **Authentication**: JWT & bcryptjs

## Installation Guide

1. Clone or download the project.
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your secrets:
   ```bash
   cp .env.example .env
   ```
4. Start the application in development mode:
   ```bash
   npm run dev
   ```
5. To build and run for production:
   ```bash
   npm run build
   npm start
   ```

## MongoDB Atlas Setup Guide

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new cluster.
3. In Database Access, add a new database user with a username and password.
4. In Network Access, add `0.0.0.0/0` to allow access from anywhere (or restrict to your application's IP).
5. Click "Connect" on your cluster, choose "Connect your application", and copy the connection string.
6. Paste the connection string into your `.env` file as `MONGODB_URI`, replacing `<password>` with the password you created for the user.

## API Testing Examples (cURL)

**Register a User**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123", "confirmPassword": "password123"}'
```

**Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```
*(This returns a JWT token)*

**Get User Profile**
*(Replace YOUR_TOKEN_HERE with the token from the login response)*
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Deployment Guide (Render & Railway)

### Render
1. Create a [Render](https://render.com/) account and connect your GitHub repository.
2. Create a new "Web Service".
3. Set the **Build Command** to `npm install && npm run build`
4. Set the **Start Command** to `npm start`
5. Under Environment Variables, add your `MONGODB_URI` and `JWT_SECRET`.
6. Click "Create Web Service".

### Railway
1. Create a [Railway](https://railway.app/) account and connect your GitHub repo.
2. Railway will automatically detect the Node.js environment.
3. Go to Variables and add `MONGODB_URI` and `JWT_SECRET`.
4. Wait for the initial deployment to finish (it automatically builds and starts).
5. Generate a Domain URL from the Settings tab to access your deployed app.
