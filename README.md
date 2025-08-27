# 🚖 Taxi App Backend

A backend service for a Taxi Booking App built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize ORM**.  
It provides **user authentication, authorization, and role-based access** (Passenger, Driver, Admin) with support for **JWT tokens, cookies, and request validation**.

---

## ✨ Features

- User roles: **Passenger, Driver, Admin**
- Authentication & Authorization using **JWT**
- Password hashing with **bcrypt**
- Request validation using **express-validator**
- Database: **PostgreSQL** (via Sequelize ORM)
- API filtering, pagination, and search
- RESTful API design
- Environment-based configuration (`.env`)
- Error handling with custom `ApiError` middleware

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/your-username/taxi-app-backend.git
cd taxi-app-backend

### 2️⃣ Install dependencies
npm install

### 3️⃣ Create config.env file
PORT=3000
NODE_ENV=development

# Database config
DB_HOST=localhost
DB_NAME=taxi_app
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

### 4️⃣ Run the server

Development mode:
npm run dev

Production mode:
npm run start:prod


## 🛠️ Tech Stack

Node.js + Express.js

PostgreSQL + Sequelize ORM

JWT for authentication

bcryptjs for password hashing

express-validator for validation

morgan for logging

## 🚀 Future Improvements

Add Driver model & ride booking logic

Implement payment integration

Real-time driver location tracking with WebSockets

Add unit & integration testing





