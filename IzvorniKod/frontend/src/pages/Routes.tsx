import { Link } from 'react-router-dom';
import '../components/routes.css';
import React, { useState, useEffect } from 'react';

const Routess = () => {
    const [savedRoutes, setSavedRoutes] = useState<string[]>([]);
    const [ownedRoutes, setOwnedRoutes] = useState<string[]>([]);

    const fetchRoutes = async () => {
        try {
            const response = await fetch('/api/route/myRoutes');
            const data = await response.json();

            setSavedRoutes(data.savedRoutes);
            setOwnedRoutes(data.ownedRoutes);
            console.log(data);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

  return (
    <div className='routes-container'>
        <div className='routes-container2'>
        <div className='routes-container3'>
        <h1>My Routes</h1>
        <Link to={'/createRoute'}><button>+</button></Link>
        </div>
        <div className='grid-route-container'>
            <div className='userRoute'>
                <p>RouteName</p>
                <p>routeid</p>
                <img></img>
            </div>
            <div className='userRoute'>
                <p>RouteName</p>
                <p>routeid</p>
                <img></img>
            </div>
            <div className='userRoute'>
                <p>RouteName</p>
                <p>routeid</p>
                <img></img>
            </div>
            <div className='userRoute'>
                <p>RouteName</p>
                <p>routeid</p>
                <img></img>
            </div>
            <div className='userRoute'>
                <p>RouteName</p>
                <p>routeid</p>
                <img></img>
            </div>
        </div>
        </div>
    </div>
    
  );
};

export default Routess;