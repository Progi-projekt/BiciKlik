import logo from '../assets/Bicklik.png'
import "./heading.css"
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import icon from '../assets/icon.png';

const Heading =() => {
    const [LoggedIn, setLoggedIn] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    useEffect(() => {
      const connectSid = Cookies.get('connect.sid');
      const loggedInAs = Cookies.get('loggedInAs');
  
      if (true) { //connectSid && loggedInAs
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
          {LoggedIn && <li><Link to={"/createRoute"} className="createButton">Create Route</Link></li>} 
        </ul>

        {LoggedIn ? (
          <>
            <img src={icon} alt='ikona' className='ikona' onClick={() => setOpenProfile((prev) => !prev)}/>
            {openProfile &&
            <div className='dropDown-container'>
            <ul className='dropDown'>
            <li className='logoutItem'>LogOut</li>
            </ul>
            </div>
            }
          </>
        ) : (
          <Link to={"/login"}> <button className='LogIn'>Log In</button> </Link>
        )}

      </div>
    );
  }
  export default Heading;
