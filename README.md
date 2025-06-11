# MyWebSite

A fullstack web application built with **NestJS** (backend) and **React** (frontend).

---

## 🚀 Tech Stack

### Backend (NestJS)
- [NestJS](https://nestjs.com/) — Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) — ORM
- [PostgreSQL](https://www.postgresql.org/) — Database
- [JWT](https://jwt.io/) — Authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) — Password hashing

### Frontend (React)
- coming soon


---

## 📁 Project Structure
```
/MyWebSite
├── backend/
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── app.module.ts
│ │ └── main.ts
│ ├── prisma/
│ ├── test/
│ ├── .env
│ └── package.json
├── .gitignore
└── README.md # This file
```

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/Andriy2444/MyWebSite.git
cd MyWebSite
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Set up your `.env` file (example below)
```angular2html
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your_jwt_secret"
```
- Run database migration:
```bash
npx prisma migrate dev
```
- Start the backend:
```bash
npm run start
```

---

### 3. Frontend Setup
coming soon

---

## 🔐 Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Protected routes use `Authorization: Bearer <token>`

---

## ⚖️ License

This project is licensed under a [custom license](LICENSE).