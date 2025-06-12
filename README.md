# MyWebSite

A fullstack web application built with **NestJS** (backend) and **React** (frontend).

---

## 🚀 Tech Stack

### Backend (NestJS)
- [NestJS](https://nestjs.com/) — Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) and [Mongodb](https://www.mongodb.com/) — Database
- [Prisma](https://www.prisma.io/) and [Mongoose](https://mongoosejs.com) — ORM
- [JWT](https://jwt.io/) — Authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) — Password hashing

### Frontend (React)
- planned

### DevOps / Tools
- [Docker](https://www.docker.com/) — Containerization
- [Docker Compose](https://www.docker.com/compose/) — Multi-container orchestration
- [dotenv](https://www.npmjs.com/package/dotenv) — Environment config loader



---

## 📁 Project Structure
```
/MyWebSite
├── backend/
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── products/
│ │ ├── app.module.ts
│ │ └── main.ts
│ ├── prisma/
│ ├── test/
│ ├── .env
│ └── package.json
├── frontend/             # (planned)
├── docker-compose.yml
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

### 2. 🛠️ Backend Setup
```bash
cd backend
npm install
```
- Set up your `.env` file (example below)
```angular2html
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
MONGODB_URI="mongodb://user:password@localhost:27018/mydb"
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

### 3. 🖥️ Frontend Setup
planned

---

### 4. 🐳 Docker Setup
```bash
docker-compose up --build
docker ps
```

---

## 🔐 Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Protected routes use `Authorization: Bearer <token>`

---

## 📦 API Endpoints
- `GET /products` — Get all products
- `GET /products/:id` — Get a product by id
- `POST /products` — Create a new product
- `PUT /products/:id` — Update product by id
- `DELETE /products/:id` — Delete product by id

---

## ⚖️ License

This project is licensed under a [custom license](LICENSE).