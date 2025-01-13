import logo from '../assets/Bicklik.png';
import "./heading.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import icon from '../assets/icon.png';
import { useAuth } from '../AuthContext';
import { response } from 'express';

const Heading = () => {
  const { loggedIn, userRole, checkAuthStatus } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        checkAuthStatus();
        setOpenProfile((prev) => !prev);
        console.log(userRole);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

const upgrade = async () => {
  try{
    const response = await fetch('/api/auth/upgrade', {
      method: "POST"
    });
    if (response.ok) {
      console.log("Upgrade successful");
    } else {
      console.error("Upgrade failed");
    }
  } catch(error){
    console.error('Error', error);
  }
}

const downgrade = async () => {
  try{
    const response = await fetch('api/auth/downgrade', {
      method: "POST"
    });
    if (response.ok) {
      console.log("Downgrade successful");
    } else {
      console.error("Downgrade failed");
    }
  } catch(error) {
    console.error('Error', error);
  }
}

  return (
    <div className="Heading">
      <Link to={"/"}><img src={logo} alt='logo' className='logo'></img></Link>
      <ul>
        <li><Link to={"/"} className="clickable">News Feed</Link></li>
        {loggedIn && <li><Link to={"/chat"} className="createButton">Chat</Link></li>}
        {loggedIn && <li><Link to={"/createRoute"} className="createButton">Create Route</Link></li>}
      </ul>
      {loggedIn ? (
        <>
          <img src={icon} alt='ikona' className='ikona' onClick={() => setOpenProfile((prev) => !prev)} />
          {openProfile &&
            <div className='dropDown-container'>
              <ul className='dropDown'>
                {userRole === "user" && <li onClick={upgrade}>Upgrade</li>}
                {userRole === "organizer" && <li onClick={downgrade}>Downgrade</li>}
                {(userRole === "organizer" || userRole === "admin") && <li><Link to={"/createEvent"} className="clickable">Create Event</Link></li>}
                <li className='logoutItem' onClick={handleLogout}>LogOut</li>
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