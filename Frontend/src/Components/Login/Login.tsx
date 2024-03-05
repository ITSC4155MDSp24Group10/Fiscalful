import React, { useState, FormEvent } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';

// Add icons to the library
library.add(faEye, faEyeSlash);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signIn = (e: FormEvent) => {
    e.preventDefault();
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        localStorage.setItem('firebase_user_id', uid); // store uid in local storage for authentication
        navigate('/dashboard');
      })
      .catch((error) => {
        setError('Email and password combination do not match!');
        console.log(error);
      });
  };  

  return (
    <section className="login section" id="login">
      <h1 className="login__title">Log In</h1>
      <span className="login__subtitle">Register An Account</span>

      <h3 className="login">Log Into Your Account</h3>
      <form onSubmit={signIn}>
        <input
          className="email"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            className="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          {password && (
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <button className="login__button" type="submit">
          Log In
        </button>
      </form>
      <Link to="/signup" className="register">
        <i></i> Don't Have An Account? Register Today!
      </Link>
    </section>
  );
}

export default Login;
