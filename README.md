# 🚀 Decode Labs Backend API

A production-style backend API powering the Decode Labs Placement Preparation Platform.

This backend provides REST APIs for authentication, user profiles, DSA progress tracking, interview preparation, aptitude practice, company information, personalized roadmap generation, resume management, and dashboard analytics.

Designed using a modular architecture with Express.js and TypeScript, making the project scalable, maintainable, and easy to extend.

---

# 📌 Project Overview

The Decode Labs Backend serves as the API layer between the frontend application and the data source.

It manages:

- User Authentication
- User Profiles
- Dashboard Analytics
- DSA Tracking
- Interview Preparation
- Aptitude Progress
- Resume Management
- Placement Roadmap
- Company Information
- Planner & Task Management

The backend follows a feature-based folder structure and REST API design principles.

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Authorization Middleware

---

## Dashboard

Provides dashboard statistics including

- Overall Progress
- Completed Topics
- Daily Streak
- Weekly Activity
- Placement Readiness

---

## DSA Module

- Track solved questions
- Topic-wise progress
- Difficulty level tracking
- Progress statistics

---

## Aptitude Module

- Logical Reasoning
- Quantitative Aptitude
- Verbal Ability
- Topic Progress

---

## Interview Preparation

- HR Questions
- Technical Interview Questions
- Mock Interview Data
- Interview Progress

---

## Resume Module

- Resume Information
- Skills
- Education
- Experience
- Projects

---

## Placement Roadmap

Provides structured preparation roadmap including

- Beginner
- Intermediate
- Advanced

Roadmaps are categorized based on preparation level.

---

## Company Module

Stores company-specific information including

- Hiring Process
- Eligibility
- Interview Pattern
- Difficulty
- Preparation Strategy

---

## Planner Module

Allows users to

- Plan Daily Tasks
- Weekly Goals
- Track Progress
- Maintain Study Schedule

---

# 🛠 Tech Stack

Backend

- Node.js
- Express.js
- TypeScript

Authentication

- JSON Web Token (JWT)

Validation

- Express Validator

Architecture

- REST API

Development Tools

- npm
- Git
- GitHub

---

# 📁 Folder Structure

```
decode_labs_project2/

│
├── src/
│
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── validators/
│   ├── utils/
│   ├── app.ts
│   └── index.ts
│
├── data/
│
├── package.json
├── tsconfig.json
├── build.mjs
└── README.md
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/your-username/decode_labs_project2.git
```

Move into the project

```bash
cd decode_labs_project2
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Start production server

```bash
npm start
```

---

# 📡 API Modules

## Authentication

```
POST /auth/register

POST /auth/login
```

---

## Dashboard

```
GET /dashboard
```

---

## DSA

```
GET /dsa

POST /dsa

PUT /dsa/:id

DELETE /dsa/:id
```

---

## Aptitude

```
GET /aptitude

POST /aptitude
```

---

## Interview

```
GET /interview

POST /interview
```

---

## Resume

```
GET /resume

POST /resume

PUT /resume
```

---

## Profile

```
GET /profile

PUT /profile
```

---

## Planner

```
GET /planner

POST /planner
```

---

## Companies

```
GET /companies
```

---

## Roadmap

```
GET /roadmap
```

---

# 🔐 Authentication

Protected routes require a JWT token.

Example

```
Authorization: Bearer YOUR_TOKEN
```

---

# 🧩 Architecture

The backend follows a layered architecture.

```
Client

↓

Routes

↓

Controllers

↓

Middleware

↓

Validators

↓

Data Layer

↓

Response
```

This structure makes the application scalable and easy to maintain.

---

# 📈 Future Improvements

- MongoDB Integration
- PostgreSQL Support
- Redis Cache
- Docker Support
- Swagger API Documentation
- Rate Limiting
- Email Verification
- Password Reset
- OAuth Login
- Admin Dashboard
- Notifications
- Cloud Deployment
- Unit Testing
- CI/CD Pipeline

---

# 🧪 Testing

The API can be tested using

- Postman
- Thunder Client
- Insomnia

---

# 🚀 Deployment

The project can be deployed on

- Render
- Railway
- AWS EC2
- DigitalOcean
- Azure
- Google Cloud Platform

---

# 👨‍💻 Author

**Arihant Jain**

B.Tech Computer Science Engineering

Backend Developer

GitHub:
https://github.com/arihantjain02

---

# 📄 License

This project is intended for educational purposes and portfolio demonstration.

Feel free to fork, modify, and build upon it.

---

## ⭐ If you found this project useful, consider giving it a star.
