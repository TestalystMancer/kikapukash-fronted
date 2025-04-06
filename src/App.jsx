import React from "react";
import LandingPage from "./pages/LandingPage";  // Adjust the import path if necessary
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletPage from "./pages/wallet/WalletPage";
import UsersPage from "./pages/users/UsersPage";

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;




