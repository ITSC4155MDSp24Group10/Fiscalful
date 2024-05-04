import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, signOut } from './firebase';
import "./app.css";
import Header from "./Components/Header/Header";
import Chatbot from './Components/Chatbot/chatbot';
import Footer from "./Components/Footer/Footer";
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
    useEffect(() => {
        signOut(auth);
    }, []);
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
                        <Chatbot />
                    <Footer />
                </Router>
            </AuthProvider>
        </>
    );
}

export default App;