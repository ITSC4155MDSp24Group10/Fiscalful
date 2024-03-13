import React from 'react';
import backgroundImage from "../../Assets/1710168939527.jpeg";
import './landing.css';


const Landing = () => {
 return (
   <section className='landing section' id='landing'>
     <div className='landing-container'>
       <div className='landing-content'>
         <div className='landing-text'>
           <h1 className='landing-title'>Financial freedom begins with you!</h1>
           <h2 className='landing-subtitle'>Begin shaping your financial future today!</h2>
           <button className='get-started-button' onClick={() => window.location.href='/signup'}>Start today</button>
         </div>
       </div>
       <div className='landing-image' style={{ backgroundImage: `url(${backgroundImage})`}}></div>
     </div>
   </section>
 );
};


export default Landing;