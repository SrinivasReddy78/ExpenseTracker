
# **Expense Tracker (MERN)**

### **Project Overview**
The Expense Tracker is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It enables users to manage their finances by tracking their income and expenses, offering visual data representation with graphs. The application is structured as a **monorepo**, with separate frontend and backend folders, and uses **npm** to manage dependencies and run commands.

---

### **Table of Contents**
1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Installation and Setup](#installation-and-setup)
4. [Available Pages](#available-pages)
5. [Contribution](#contribution)
6. [License](#license)

---

### **Technologies Used**
- **MongoDB**: NoSQL database to store user data, income, and expense records.
- **Express.js**: Web framework for Node.js, handling backend routing and API.
- **React.js**: Frontend framework for building user interfaces and managing state.
- **Node.js**: JavaScript runtime for the backend server.
- **Vite**: Fast build tool for front-end development.
- **Tailwind CSS**: For designing responsive and modern UI.
- **JWT**: JSON Web Tokens for user authentication.

---

### **Project Structure**

The project is organized as a **monorepo** with separate folders for the frontend and backend.

```
ExpenseTracker/
│
├── frontend/
│   ├── src/                # React components, pages, and assets
│   ├── public/             # Public assets
│   ├── package.json        # Frontend dependencies and scripts
│   └── ...
│
└── backend/
    ├── models/             # MongoDB models (User, Income, Expense)
    ├── routes/             # API routes for authentication, income, and expenses
    ├── controllers/        # Logic for handling API requests
    ├── config/             # Database and environment configurations
    ├── server.js           # Main server file
    ├── package.json        # Backend dependencies and scripts
    └── ...
```

---

### **Installation and Setup**

#### **Frontend Setup**
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```

#### **Backend Setup**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

---

### **Available Pages**

1. **Signup ( `/` )**: A page where users can register to the application by providing the necessary credentials.
   
2. **Login**: A page where registered users can log into their account.
   
3. **Dashboard**: After a successful signup or login, users are redirected to the dashboard. This page contains line and pie charts for visually representing income and expenses.
   
4. **Income**: A page where users can add new income records and view the history and total income.
   
5. **Expense**: A page where users can add new expense records and view the history and total expenses.

---

### **Contribution**

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

