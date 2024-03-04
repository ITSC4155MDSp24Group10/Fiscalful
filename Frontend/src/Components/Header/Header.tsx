import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className='header'>
            <nav className='header-nav'>
                <ul className='links'>
                    <div className='left-side'>
                        <li><Link to="/">Logo</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </div>
                    <div className='right-side'>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Get Started</Link></li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;