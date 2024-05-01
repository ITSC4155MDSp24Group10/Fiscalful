import React from 'react';
import './about.css';
import placeholder from '../../Assets/placeholder-portrait.jpg';
import trevor_portrait from '../../Assets/trevor-portrait.jpg';
import devon_portrait from '../../Assets/devon-portrait.jpg';
import minh_portrait from '../../Assets/minh-portrait.jpg';
import shail_portrait from '../../Assets/shail-portrait.jpg';
import finance_image from '../../Assets/finance-graphic.png';

const About = () => {
  return (
    <div>
      <h1 className='about-title'>About Us</h1>

      <div className='info-container'>
        <div className='story-container'>
          <h2 className='story-subtitle'>Our Vision</h2>
          <p className='story-text'>Currently, hundreds of millions of people worldwide are suffering from economic hardships brought on by a variety of internal and external factors. To encourage financial security and stability, it is imperative that people have access to the technology that will assist and support their financial decisions. That is where Fiscalful comes in. Our software offers ways to provide information on economic trends, create budgeting plans, and securely connect to a user's bank account. Through an intuitive chatbot, users can gain personalized financial insights and advice. Lastly, budget plans can be customized based on their income, expenses, and financial goals.</p>
          <img src={finance_image} alt='Finance Graphic'></img>
        </div>

        <div className='vertical-divider'></div>
        <div className='horizontal-divider'></div>

        <div className='team-container'>
          <h2>Meet the Team</h2>
          <div className='team-info'>
            

            <div className='card'>
              <div className='card-info'>
                <img src={trevor_portrait} alt='Trevor Richardson'></img>
                <h4>Trevor<br></br>Richardson</h4>
                <p>Frontend</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={devon_portrait} alt='Devon Lemasters'></img>
                <h4>Devon<br></br>Lemasters</h4>
                <p>Backend</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={shail_portrait} alt='Shail Patel'></img>
                <h4>Shail<br></br>Patel</h4>
                <p>Backend</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={placeholder} alt='Justin Tubay Sanchez'></img>
                <h4>Justin Tubay<br></br>Sanchez</h4>
                <p>Backend</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={minh_portrait} alt='Minh Anh Nguyen'></img>
                <h4>Minh Anh<br></br>Nguyen</h4>
                <p>Frontend</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;