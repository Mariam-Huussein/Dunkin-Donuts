# 🍩 Dunkin' Donuts Web Clone

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

This is a modern, responsive web application inspired by **Dunkin' Donuts**. It was developed as a training project during my internship at **DevWave**, demonstrating proficiency in frontend development, state management, and backend-as-a-service integration.

Users can browse a dynamic menu, manage their carts and wishlists, create accounts, and securely place orders using Firebase infrastructure.

---

## ⚡ Key Features

- **🛍️ Complete Shopping Experience**: Browse items, add to cart, and save favorites to a wishlist.
- **🔐 Secure Authentication**: Full user authentication flow (Register, Login, Forgot Password) powered by Firebase.
- **📦 Order Management**: Authenticated users can place orders, which are securely stored in Firebase Firestore.
- **🛡️ Protected Routes**: Route guarding ensures only logged-in users can access checkout and specific profile areas.
- **📱 Fully Responsive**: A mobile-first design approach using Bootstrap and custom CSS for a seamless experience on any device.
- **🔍 Dynamic Menu**: Filter and search through products in real-time.
- **🔔 Interactive UI**: Toast notifications, loading spinners, and modern icons enhance the user experience.

---

## 🛠️ Tech Stack & Libraries

### Frontend Core
- **React 19** & **Vite** → Lightning-fast development and optimized production builds.
- **React Router v7** → Client-side routing and navigation.

### State Management
- **Redux Toolkit (RTK)** → Efficient, scalable global state management for the Cart, Wishlist, and User Session.

### UI & Styling
- **Bootstrap 5** & **React Bootstrap** → Responsive layout grid and accessible UI components.
- **Material-UI (MUI)** → Additional premium React components.
- **Custom CSS** → Tailored styling to match the Dunkin' Donuts brand aesthetic.
- **Lucide React** & **React Icons** → Extensive icon libraries for a polished look.

### Backend & Services
- **Firebase Authentication** → Secure user credential management.
- **Firebase Firestore** → NoSQL cloud database for storing user orders and data.

### Utilities
- **Zod** → Schema validation for robust form handling.
- **React Hot Toast** & **React Toastify** → Beautiful, customizable notifications.
- **React Spinners** → Engaging loading state animations.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Mariam-Huussein/Dunkin-Donuts.git
cd Dunkin-Donuts
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Firebase Config
Create a Firebase project, enable Authentication (Email/Password) and Firestore. Update the `firebaseconfig.js` with your project credentials.

### 4. Run the development server
```bash
npm run dev
```

---

## 🌐 Live Demo

Check out the live version of the project here:  
👉 **[Dunkin' Donuts Web App](https://mariam-huussein.github.io/Dunkin-Donuts/)**

*(Note: The project is also configured for Vercel deployment).*

---

## 📚 Acknowledgments

- This project was built as part of an intensive training program at **DevWave**.
- It showcases the integration of modern web technologies to create a production-ready e-commerce frontend.
