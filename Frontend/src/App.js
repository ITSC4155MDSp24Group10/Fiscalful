import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Landing from "./Components/Landing/Landing";


function App() {
    return (
        <Router>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Landing />} />

                </Routes>
            </main>
        </Router>
    );
}

export default App;