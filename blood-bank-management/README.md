# LifeDrop — Blood Bank Management System

A full-stack Blood Bank Management System built with Next.js, React, JavaScript, CSS, Next.js API routes and MongoDB.

## Features
- Responsive landing page
- Blood group availability search
- Donor registration
- Blood request submission
- MongoDB blood inventory
- Admin dashboard for inventory, donors and requests
- User registration/login API
- Low-stock indicators
- Mobile responsive UI

## Requirements
- Node.js 18.18+ recommended
- MongoDB local server or MongoDB Atlas
- VS Code recommended

## Run locally

1. Open this folder in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.local.example` to `.env.local`.

For local MongoDB:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/blood_bank
```

For MongoDB Atlas, put your Atlas connection string in `MONGODB_URI`.

4. Start the application:

```bash
npm run dev
```

5. Open:

http://localhost:3000

## Important
The Admin page is a project/demo management dashboard. For a production application, add secure server-side authentication/authorization, sessions or JWT, CSRF protection, rate limiting, audit logs, validation, and role-based middleware before exposing administrative operations publicly.
