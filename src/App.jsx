import React from "react";
import LandingPage from "./pages/LandingPage";  // Adjust the import path if necessary
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletPage from "./pages/wallet/WalletPage";
import UsersPage from "./pages/users/UsersPage";

import LoginForm from './components/auth/login/loginForm';
import SignupForm from './components/auth/login/SignUpForm';
import UserProfile from "./pages/users/profile";
import TransactionList from "./pages/wallet/TransactionList";
import SavingsGroupPage from "./pages/groups/SavingsGroupPage";

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
          <Route path="/dashboard/transactions" element={<TransactionList />} />
          <Route path="/dashboard/groups" element={<SavingsGroupPage />} />
     
        </Routes>
      </BrowserRouter>
    );
};

export default App;




