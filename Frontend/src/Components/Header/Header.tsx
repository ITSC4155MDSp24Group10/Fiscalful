import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faEnvelope, faChartLine, faRightToBracket, faSquarePlus, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = () => {
  const location = useLocation();
  const { isUserLoggedIn, setIsUserLoggedIn, isLoading } = useAuth(); // Add isLoading to the destructured variables

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

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
          <Link className='logo' to="/">Fiscalful</Link>
          <div className={isMenuOpen ? 'links-container change_to_flex' : 'links-container change_to_none'}>
            <li><FontAwesomeIcon icon={faCircleInfo} /><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><FontAwesomeIcon icon={faEnvelope} /><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            {isLoading ? (
              <p>Loading...</p> // Show a loading message while the auth state is being checked
            ) : isUserLoggedIn ? (
              <li className='dashboard-link'><FontAwesomeIcon icon={faChartLine} /><Link to="/dashboard" onClick={toggleMenu}>User Dashboard</Link></li>
            ) : (
              <>
                <li className='login-link' onClick={toggleMenu}><FontAwesomeIcon icon={faRightToBracket} /><Link to="/login">Log In</Link></li>
                <li className='signup-link' onClick={toggleMenu}><FontAwesomeIcon icon={faSquarePlus} /><Link to="/signup">Get Started</Link></li>
              </>
            )}
          </div>
          <div className='menu-button' onClick={toggleMenu}>
            {isMenuOpen ? <FontAwesomeIcon icon={faXmark} size='xl' /> 
            : <FontAwesomeIcon icon={faBars} size='xl'/>
            }
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;