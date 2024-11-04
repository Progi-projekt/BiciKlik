import logo from '../Bicklik.png'
import React from 'react';
import "./heading.css"

const Heading =() => {
    return (
      <div className="Heading">
        <img src={logo} alt='logo' className='logo'></img>

        <ul>
          <li>News Feed</li>
          <li>Feature1</li>
          <li>Feature2</li>
        </ul>
        
        <button className='LogIn'>Log In</button>
      </div>
    );
  }
  export default Heading;