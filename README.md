# MyWebSite

A fullstack web application built with **NestJS** (backend) and **React** (frontend).

---

## 🚀 Tech Stack

### 🧠 Backend (NestJS)

* ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
* ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
* ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
* ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
* ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
* ![bcrypt](https://img.shields.io/badge/-bcrypt-00599C?style=flat-square&logo=lock&logoColor=white)

---

### 🎨 Frontend (React) planned

- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)

---

### ⚙️ DevOps / Tools

- ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
- ![Docker Compose](https://img.shields.io/badge/-Docker%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
- ![dotenv](https://img.shields.io/badge/-dotenv-ECD53F?style=flat-square&logo=gnubash&logoColor=black)


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

### 2. 🧠 Backend Setup
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

### 3. 🎨 Frontend Setup
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