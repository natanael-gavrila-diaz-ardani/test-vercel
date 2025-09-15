# Express TS OAuth Project

This project is an **Express + TypeScript** backend with **OAuth login** handled via **NextAuth on the frontend**. The backend is responsible for storing logged-in users and validating tokens.

---

## ⚡ Setup

1. **Clone the repo and install dependencies**

```bash
git clone <repo-url>
cd <project-folder>
npm install
```

2. **Create database & run migration**

```bash
npx sequelize-cli migration:generate --name create-users
npx sequelize-cli db:migrate
```

3. **Create a `.env` file** in the project root:

```env
DATABASE_URL=
DB_HOST=localhost
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

JWT_SECRET=
SESSION_SECRET=

PORT=8000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000
```

4. **Start the development server**

```bash
npm run dev
```

The server will run at `http://localhost:8000`.

---

## 🔑 Login Flow

1. The **frontend** uses **NextAuth** to handle Google login.
2. After a successful login, the frontend receives a **JWT token** from the backend or session info from NextAuth.
3. The frontend sends this token to the **backend** whenever it needs access to protected resources.
4. The **backend** validates the token and looks for the user in the database.

   * If the user is new → save to the `users` table.
   * If the user already exists → just validate the token.
5. If the token is valid, the backend grants access to the requested endpoint.

---

## ⚙️ Notes

* **JWT\_SECRET** is used to sign/verify tokens.
* **SESSION\_SECRET** is used for NextAuth sessions on the frontend.
* Frontend can login via Google directly; backend only needs to verify the token—no repeated login required.
* Default backend port: `8000`
* Default frontend port: `3000`
