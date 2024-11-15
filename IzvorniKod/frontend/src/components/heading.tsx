import logo from '../assets/Bicklik.png'
import "./heading.css"
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import icon from '../assets/icon.png';

const Heading =() => {
    const [LoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      const connectSid = Cookies.get('connect.sid');
      const loggedInAs = Cookies.get('loggedInAs');
  
      if (connectSid && loggedInAs) {
        setLoggedIn(true);  
      } else {
        setLoggedIn(false); 
      }
    }, []);

    return (
      <div className="Heading">
        <img src={logo} alt='logo' className='logo'></img>

        <ul>
          <li><Link to={"/"} className="clickable">News Feed</Link></li>
          <li><Link to={"/chat"} className="clickable">Chat</Link></li>
          <li>Feature1</li>
        </ul>

        {LoggedIn ? (
            <img src={icon} alt='ikona' className='ikona'/>
        ) : (
          <Link to={"/login"}> <button className='LogIn'>Log In</button> </Link>
        )}

      </div>
    );
  }
  export default Heading;
