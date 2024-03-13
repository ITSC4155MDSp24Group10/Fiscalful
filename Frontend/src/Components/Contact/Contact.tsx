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
    <div className='container'>
      <form ref={form} onSubmit={sendEmail} className='contact-form'>
        <h1 className='contact-title'>Contact Us</h1>
        <input type='text' placeholder='Your Name' name='user_name' className='name' required />
        <input type='text' placeholder='Your Email' name='user_email' className='email' required />
        <textarea placeholder='Leave a Message' name='message' className='message' required ></textarea>
        <div>
          <button type='submit' className='submit-button'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;