import React from 'react';
import './about.css';
import placeholder from '../../Assets/placeholder-portrait.jpg';

const About = () => {
  return (
    <div>
      <h1 className='about-title'>About Us</h1>

      <div className='info-container'>
        <div className='story-container'>
          <h2 className='story-subtitle'>Our Vision</h2>
          <p>Sed non velit sit amet metus mattis dapibus id ut dui. Etiam sem ligula, feugiat eu sapien non, iaculis bibendum tortor. Sed egestas dolor metus, laoreet varius ante semper et. Phasellus laoreet et purus sit amet sagittis. Integer at consequat ligula. Fusce nec auctor lectus. Quisque imperdiet est et sem ultricies, vel ultricies ante tristique. Aliquam at dolor tincidunt, volutpat tellus a, imperdiet massa. Nam finibus ipsum consequat orci viverra, in convallis libero laoreet. Mauris quis malesuada nisl. Aliquam id arcu imperdiet, posuere mi quis, scelerisque lectus. Proin eget nunc non nunc sagittis maximus et eu turpis.</p>
        </div>

        <div className='vertical-divider'></div>

        <div className='team-container'>
          <div className='team-info'>
            <h2>Meet the Team</h2>

            <div className='card'>
              <div className='card-info'>
                <img src={placeholder} alt='Student 1'></img>
                <h4>Student 1</h4>
                <p>Team Role</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={placeholder} alt='Student 1'></img>
                <h4>Student 2</h4>
                <p>Team Role</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={placeholder} alt='Student 1'></img>
                <h4>Student 3</h4>
                <p>Team Role</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={placeholder} alt='Student 1'></img>
                <h4>Student 4</h4>
                <p>Team Role</p>
              </div>
            </div>

            <div className='card'>
              <div className='card-info'>
                <img src={placeholder} alt='Student 1'></img>
                <h4>Student 5</h4>
                <p>Team Role</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;