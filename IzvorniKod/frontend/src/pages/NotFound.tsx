// frontend/src/pages/NotFound.tsx
import React from 'react';
import '../components/notfound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='notfound-container'>
      <p className='notfound-text'>404</p>
      <p className='notfound-text2'>Page Not Found</p>
      <p className='notfound-text3'>The page you requested was not found...</p>
      <Link to={"/"}> <button className='button-notfound'>Home</button></Link>
    </div>
  );
};

export default NotFound;