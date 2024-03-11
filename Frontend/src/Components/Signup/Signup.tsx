import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();

  const Create = (e: FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="signup section" id="signup">
      <div className='signup-container'>
        <h1 className="signup__title">Sign Up</h1>
        <span className="signup__subtitle">Register An Account</span>

        <div className='form-container'>
          <h2 className="signup">Create An Account</h2>
          <form onSubmit={Create}>
            <input
              className="name"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
                type='text'
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
            </div>
            <button className="signup__button" type="submit">
              Sign Up
            </button>
          </form>
          
          <Link to="/login" className="login-toggle">
            <i></i> Already Have An Account? Login!
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Signup;
