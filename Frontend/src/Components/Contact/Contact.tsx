import React from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_scwb19e', 'template_q4o5lbr', form.current, {
          publicKey: 'mK7ZAACRkrLszHj0c',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    }
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="login-container" id="contact">
        <h1 className="login__title">Contact</h1>
        <span className="login__subtitle">Reach Out To Us</span>
  
      <div className='form-container'>
        <div className='login'>
          <h2>Send Us A Message</h2>
          <form ref={form} onSubmit={sendEmail}>
            <input 
              type='text' 
              placeholder='Your Name' 
              name='user_name' 
              className='email' required 
            />
            <input 
              type='text' 
              placeholder='Your Email' 
              name='user_email' 
              className='email' required 
            />
            <textarea 
              placeholder='Leave a Message' 
              name='message' 
              className='email' required 
            ></textarea>
            <button type='submit' className='login__button'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;