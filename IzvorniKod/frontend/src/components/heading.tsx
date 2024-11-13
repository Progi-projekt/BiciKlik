import logo from '../assets/Bicklik.png'
import React from 'react';
import "./heading.css"
import { Link } from 'react-router-dom';
const Heading =() => {
    return (
      <div className="Heading">
        <img src={logo} alt='logo' className='logo'></img>

        <ul>
          <li><Link to={"/"} className="clickable">News Feed</Link></li>
          <li><Link to={"/chat"} className="clickable">Chat</Link></li>
          <li>Feature1</li>
        </ul>

        <Link to={"/login"}><button className='LogIn'>Log In</button></Link>
      </div>
    );
  }
  export default Heading;
