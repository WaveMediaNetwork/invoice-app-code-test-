# Invoice Management App

Welcome to the **Invoice Management App**, a full-stack application for managing invoices, built with modern technologies like **NestJS**, **React**, **Redux**, and **Tailwind CSS**. This project demonstrates CRUD functionalities, interactive UI components, and a seamless backend-frontend integration.

## Features

- Manage invoices with options to add, view, and delete.
- Modern UI built with **Tailwind CSS**.
- Secure backend using **NestJS** and **Prisma** ORM.
- State management with **Redux Toolkit**.
- Responsive design for desktop and mobile.
- Real-time updates to the invoice list.
- Smooth animations for modals and UI interactions.

## Tech Stack

### Backend
- **NestJS**: A progressive Node.js framework.
- **Prisma**: ORM for interacting with PostgreSQL database.
- **JWT Authentication**: For secure login.
- **Docker**: Containerized development.

### Frontend
- **React**: Component-based UI library.
- **Redux Toolkit**: State management.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vite**: Fast development build tool.
- **shadcn/ui**: Modern UI components.

### Database
- **PostgreSQL**: Relational database for managing invoice records.

---

## Installation and Setup

### Prerequisites

- **Node.js** (>= 16.x)
- **Docker** (for PostgreSQL database)
- **Git**
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>

Backend Setup
Navigate to the server directory:

bash
Copy code
cd server
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file and configure it with the following:

env
Copy code
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/invoice_db
JWT_SECRET=<your-jwt-secret>
Start the PostgreSQL database:

bash
Copy code
docker-compose up -d
Run database migrations and seed data:

bash
Copy code
npx prisma migrate dev
npx prisma db seed
Start the server:

bash
Copy code
npm run start
The backend will run at http://localhost:3000.

Frontend Setup
Navigate to the client directory:

bash
Copy code
cd client
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
The frontend will run at http://localhost:5173.

Usage
Navigate to http://localhost:5173 in your browser.
Use the "Add Invoice" button to create a new invoice.
View invoice details by clicking on a table row.
Delete invoices by selecting them and pressing the "Delete" button.
Folder Structure
bash
Copy code
/client                # Frontend application
  /src
    /components        # Reusable UI components
    /pages             # React pages
    /store             # Redux state management
/server                # Backend application
  /src
    /auth              # Authentication logic
    /invoices          # Invoice API logic
    /prisma            # Prisma configuration and database schema
