import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css";
import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing"; 
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import AccessTokenDetails from "./Components/Dashboard/AccessTokenDetails";

function App() {
    return (
        <>
            <Router>
                <Header />
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={<Dashboard />}/>
                            <Route path="/dashboard/access-token-details/:tokenId" element={<AccessTokenDetails />} />
                        </Routes>
                    </main>
            </Router>
        </>
    );
}

export default App;