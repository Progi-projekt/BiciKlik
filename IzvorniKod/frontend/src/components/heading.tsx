import logo from '../assets/Bicklik.png'
import React from 'react';
import "./heading.css"
import { Link } from 'react-router-dom';

const Heading =() => {
    return (
      <div className="Heading">
        <img src={logo} alt='logo' className='logo'></img>

        <ul>
          <li><Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}>News Feed</Link></li>
          <li className='Feature1'>Feature1</li>
          <li className='Feature2'>Feature2</li>
        </ul>
        
        <Link to={"/login"}><button className='LogIn'>Log In</button></Link>
      </div>
    );
  }
  export default Heading;