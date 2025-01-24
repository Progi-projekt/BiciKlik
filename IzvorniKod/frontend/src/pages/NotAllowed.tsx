// frontend/src/pages/NotFound.tsx
import React from 'react';
import '../components/notfound.css';
import { Link } from 'react-router-dom';

const NotAllowed = () => {
  return (
    <div className='notfound-container'>
      <p className='notfound-text'>403</p>
      <p className='notfound-text2'>Page Not Available</p>
      <p className='notfound-text3'>You do not have permission to view this page...</p>
      <Link to={"/"}> <button className='button-notfound'>Home</button></Link>
    </div>
  );
};

export default NotAllowed;