
# Invoice Management App

Welcome to the **Invoice Management App**, a full-stack application for managing invoices. This project showcases CRUD functionalities, a modern UI, and seamless integration between the frontend and backend.

## Features

- Manage invoices: add, view, and delete.
- Responsive UI built with **Tailwind CSS**.
- Secure backend using **NestJS** and **Prisma ORM**.
- State management with **Redux Toolkit**.
- Animations for modals and interactive elements.
- Real-time invoice updates.

## Tech Stack

### Backend
- **NestJS**: A progressive Node.js framework.
- **Prisma ORM**: Database modeling and querying.
- **PostgreSQL**: Relational database.
- **JWT Authentication**: Secure login and session management.
- **Docker**: Containerized database setup.

### Frontend
- **React**: Component-based UI library.
- **Redux Toolkit**: Simplified state management.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vite**: Fast build tool for modern web apps.
- **shadcn/ui**: Modern UI components.

---

## Installation and Setup

### Prerequisites
- **Node.js** (>= 16.x)
- **Docker** (for database)
- **Git**
- **npm** or **yarn**

### Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>
```

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env` file in the `server` directory and add:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/invoice_db
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations and seed data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

6. Start the server:
   ```bash
   npm run start
   ```

The backend will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the `client` directory:
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

The frontend will run on `http://localhost:5173`.

---

## Usage

1. Navigate to `http://localhost:5173` in your browser.
2. Use the **Add Invoice** button to create a new invoice.
3. View invoice details by clicking a row in the table.
4. Delete invoices using the checkbox feature.

---

## Folder Structure

```
/client                # Frontend code
  /src
    /components        # Reusable UI components
    /pages             # Pages of the app
    /store             # Redux state management
/server                # Backend code
  /src
    /auth              # Authentication logic
    /invoices          # Invoice API logic
    /prisma            # Prisma configuration
```

---

## API Endpoints

### Authentication
- `POST /auth/login`: Authenticate a user.

### Invoices
- `GET /invoices`: Fetch all invoices.
- `GET /invoices/:id`: Fetch details of a specific invoice.
- `POST /invoices`: Create a new invoice.
- `DELETE /invoices`: Delete selected invoices.

---

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Describe your changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

- **Author**: Ionut Micicoi
- **GitHub**: [WaveMediaNetwork](https://github.com/WaveMediaNetwork)
- **Email**: micicoi.ionut@gmail.com
