# MERN Learning Platform

A JavaScript MERN online learning platform built with a client-server model and MVC-style N-tier backend architecture. The app supports role-based authentication, student and course management, and many-to-many course enrollment through RESTful APIs.

## Stack

- MongoDB + Mongoose
- Express.js
- React + Vite
- Node.js

## Project Structure

- `server/`: Express API with MVC/N-tier organization
- `client/`: React frontend consuming the backend APIs

## Features

- JWT authentication with `admin` and `student` roles
- Admin CRUD for students and courses
- Student self-service course browsing and enrollment
- Enrollment management with duplicate enrollment protection
- Minimal UI with smooth transitions and polished interactions

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `server/.env` from `server/.env.example`.

3. Start MongoDB locally or provide a MongoDB Atlas connection string.

4. Seed demo data and the admin account:

```bash
npm run seed:demo --workspace server
```

5. Run the app:

```bash
npm run dev
```

## Default URLs

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Demo Credentials

- Admin: `admin@learnhub.com` / `Admin123!`
- Student: `ayesha@student.learnhub.com` / `Student123!`

## Walkthrough

See [walkthrough.md](C:/Users/ADMIN/Documents/Web%20labs/Lab%20Assessment/walkthrough.md) for a full setup and usage walkthrough.

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/students`
- `POST /api/students`
- `GET /api/students/:id`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`
- `GET /api/courses`
- `POST /api/courses`
- `GET /api/courses/:id`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `GET /api/enrollments`
- `POST /api/enrollments`
- `DELETE /api/enrollments/:id`
- `GET /api/enrollments/me`

## GitHub Push

After implementation, initialize Git and add your remote:

```bash
git init
git add .
git commit -m "Initial MERN learning platform"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
