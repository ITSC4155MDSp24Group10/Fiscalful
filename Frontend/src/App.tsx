import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./app.css";
import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing"; 
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import AccessTokenDetails from "./Components/Dashboard/AccessTokenDetails";
import { AuthProvider, useAuth } from "./Components/Header/AuthContext";

function ProtectedDashboard() {
    const { isUserLoggedIn } = useAuth();
    return isUserLoggedIn ? <Dashboard /> : <Navigate to="/login" />;
}

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Header />
                        <main className="main">
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/dashboard" element={<ProtectedDashboard />} />
                                <Route path="/dashboard/access-token-details/:tokenId" element={<AccessTokenDetails />} />
                            </Routes>
                        </main>
                </Router>
            </AuthProvider>
        </>
    );
}

export default App;