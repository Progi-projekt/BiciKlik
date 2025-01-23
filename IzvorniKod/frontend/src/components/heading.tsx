import logo from '../assets/Bicklik.png';
import "./heading.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import icon from '../assets/icon.png';
import { useAuth } from '../AuthContext';

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
        setOpenProfile(false);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const upgrade = async () => {
    try {
      const response = await fetch('/api/auth/upgrade', {
        method: "POST"
      });
      if (response.ok) {
        console.log("Upgrade successful");
        checkAuthStatus();
      } else {
        console.error("Upgrade failed");
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const downgrade = async () => {
    try {
      const response = await fetch('api/auth/downgrade', {
        method: "POST"
      });
      if (response.ok) {
        console.log("Downgrade successful");
        checkAuthStatus();
      } else {
        console.error("Downgrade failed");
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleMouseEnter = () => setOpenProfile(true);
  const handleMouseLeave = () => setOpenProfile(false);

  return (
    <div className="Heading">
      <Link to={"/"}><img src={logo} alt='logo' className='logo' /></Link>
      <ul>
        <li><Link to={"/"} className="clickable">News Feed</Link></li>
        {loggedIn && <li><Link to={"/chat"} className="clickable">Chat</Link></li>}
        {loggedIn && <li><Link to={"/myroutes"} className='clickable'>Routes</Link></li>}
      </ul>
      {loggedIn ? (
        <>
          <img 
            src={icon} 
            alt='ikona' 
            className='ikona' 
            onClick={() => setOpenProfile((prev) => !prev)} 
          />
          {openProfile && (
            <div 
              className='dropDown-container' 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <ul className='dropDown'>
                {userRole === "user" && <li onClick={upgrade}>Upgrade</li>}
                {userRole === "organizer" && <li onClick={downgrade}>Downgrade</li>}
                {(userRole === "organizer" || userRole === "admin") && <li><Link to={"/createEvent"}>Create Event</Link></li>}
                {userRole ==="admin" && <li><Link to={"/adminPanel"}>Admin Panel</Link></li>}
                <li className='logoutItem' onClick={handleLogout}>LogOut</li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link to={"/login"}> <button className='LogIn'>Log In</button> </Link>
      )}
    </div>
  );
};

export default Heading;
