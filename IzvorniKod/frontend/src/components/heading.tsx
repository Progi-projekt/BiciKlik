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
      const gState = Cookies.get('g:state');
      const loggedInAs = Cookies.get('loggedInAs');
  
      if (connectSid && gState && loggedInAs) {
        setLoggedIn(true);  
      } else {
        setLoggedIn(false); 
      }
    }, []);

    return (
      <div className="Heading">
        <img src={logo} alt='logo' className='logo'></img>

        <ul>
          <li><Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}>News Feed</Link></li>
          <li className='Feature1'>Feature1</li>
          <li className='Feature2'>Feature2</li>
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