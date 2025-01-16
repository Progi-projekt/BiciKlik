import { Link } from 'react-router-dom';
import '../components/routes.css';
import React, { useState, useEffect } from 'react';

interface Route {
    route_id: string;
    route_name: string;
}

const Routess = () => {
    const [savedRoutes, setSavedRoutes] = useState<Route[]>([]);
    const [ownedRoutes, setOwnedRoutes] = useState<Route[]>([]);

    const fetchRoutes = async () => {
        try {
            const response = await fetch('/api/route/myRoutes');
            const data = await response.json();

            console.log('Fetched data:', data); // Debugging line

            setSavedRoutes(data.savedRoutes);
            setOwnedRoutes(data.ownedRoutes);

            console.log('Saved Routes:', data.savedRoutes); // Debugging line
            console.log('Owned Routes:', data.ownedRoutes); // Debugging line
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    const unsaveRoute = async (route_id: string) => {
        try {
            const response = await fetch(`/api/route/unsaveRoute/${route_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Route unsaved successfully!');
                fetchRoutes();
            } else {
                alert('Error unsaving route!');
            }
        } catch (error) {
            console.error('Error unsaving route:', error);
        }
    };

return (
    <div className='routes-container'>
      <div className='routes-container2'>
        <div className='routes-container3'>
          <h1>My Routes</h1>
          <Link to={'/createRoute'}><button>+</button></Link>
        </div>
        <div className='grid-route-container'>
          <div>
            <h2>Owned Routes</h2>
            {ownedRoutes.map((route) => (
              <div key={route.route_id}>
                <p>{route.route_name}</p>
                <img src={`/images/route-${route.route_id}.png`} alt='RouteImg' className='slikarute' />
              </div>
            ))}
          </div>

          <div>
            <h2>Saved Routes</h2>
            {savedRoutes.map((route) => (
              <div key={route.route_id}>
                <p>{route.route_name}</p>
                <img src={`/images/route-${route.route_id}.png`} alt='RouteImg' className='slikarute' />
                <button onClick= {() => unsaveRoute(route?.route_id!)}>Unsave</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routess;