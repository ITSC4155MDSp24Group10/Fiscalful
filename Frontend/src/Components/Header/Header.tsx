import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from './AuthContext';
import './header.css';
import { set } from '@firebase/database';

const Header = () => {
    const location = useLocation();
    const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsUserLoggedIn(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [location, setIsUserLoggedIn]);

  return (
    <header className='header'>
      <nav className='header-nav'>
        <ul className='links'>
          <div className='left-side'>
            <li className='logo'><Link to="/">Fiscalful</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </div>
          <div className='right-side'>
            {isUserLoggedIn ? (
              <li><Link to="/dashboard">User Dashboard</Link></li>
            ) : (
              <>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Get Started</Link></li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;