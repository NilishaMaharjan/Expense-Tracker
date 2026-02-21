# Expense Tracker App

A full-stack **Expense Tracker** application that allows users to manage their income and expenses efficiently, visualize data with interactive charts, and generate downloadable reports. The app is mobile-responsive and features an intuitive user interface.

---

## Functionalities Implemented

1. **User Authentication** – Secure login and sign-up using JWT authentication.  
2. **Dashboard Overview** – Displays Total Balance, Income, and Expenses in summary cards.  
3. **Income Management** – Add, view, delete, and export income sources.  
4. **Expense Management** – Add, view, delete, and export expenses with category-based tracking.  
5. **Interactive Charts** – Visual representation of income & expenses using Bar, Pie, and Line charts.  
6. **Recent Transactions** – Displays the latest income and expense records for quick access.  
7. **Expense & Income Reports** – Download all income and expense data in Excel format.  
8. **Mobile Responsive UI** – Works seamlessly across desktops, tablets, and mobile devices.  
9. **Intuitive Navigation** – Sidebar menu with easy access to Dashboard, Income, Expenses, and Logout.  
10. **Delete Functionality** – Hover over income/expense cards to reveal a delete button for easy removal.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Recharts, React Icons  
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication  
- **Other Tools:** Axios, Excel Export, React Router  

---

## Pages & Features

### Auth Pages
- Login & Sign-Up forms integrated with backend authentication APIs
- Profile photo selector component

### Dashboard
- Summary cards: Total Balance, Total Income, Total Expenses
- Recent Transactions section
- Financial Overview section (Pie Chart)
- Expense Details section
- Last 30 Days Expenses (Bar Chart)
- Last 60 Days Income (Pie Chart)
- Income Details section

### Income Page
- Income Overview with Bar Chart
- Add Income form with validation
- List of all incomes with delete option
- Export income data to Excel

### Expense Page
- Expense Overview
- Add Expense form with category selection
- List of all expenses with delete option
- Export expense data to Excel

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expensetracker

2. **Install backend dependencies**
    ```bash
   cd backend
   npm install

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install

4. **Setup environment variables**

   Create a .env file in the backend folder with:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=8000

5. **Run the backend**
    ```bash
    cd backend
    npm start

6. **Run the frontend**
   ```bash
   cd frontend
   npm start
