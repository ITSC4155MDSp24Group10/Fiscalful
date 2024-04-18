import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from './AuthContext';
import './header.css';

const Header = () => {
  const location = useLocation();
  const { isUserLoggedIn, setIsUserLoggedIn, isLoading } = useAuth(); // Add isLoading to the destructured variables

  useEffect(() => {
    // Set the auth persistence to LOCAL
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
          setIsUserLoggedIn(!!user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting the persistence", error);
      });
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
            {isLoading ? (
              <p>Loading...</p> // Show a loading message while the auth state is being checked
            ) : isUserLoggedIn ? (
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