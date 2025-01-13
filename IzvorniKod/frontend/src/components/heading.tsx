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
        setOpenProfile((prev) => !prev);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="Heading">
      <img src={logo} alt='logo' className='logo'></img>
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