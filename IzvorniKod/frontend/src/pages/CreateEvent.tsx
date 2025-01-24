import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../components/CustomDropdown';
import '../components/createevent.css';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [description, setDescription] = useState('');
    const [routeId, setRouteId] = useState('');
    const [routes, setRoutes] = useState([]);
    const [hoveredRoute, setHoveredRoute] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('/api/route/myRoutes');
                const data = await response.json();
                const combinedRoutes = [...data.ownedRoutes, ...data.savedRoutes];
                setRoutes(combinedRoutes);
            } catch (error) {
                console.error('Error fetching my routes:', error);
            }
        };
        fetchRoutes();
    }, []);

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/event/createEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventName, shortDescription, eventTime, description, routeId }),
            });

            if (response.ok) {
                alert('Event created successfully! Redirecting to newsfeed...');
                setEventName('');
                setShortDescription('');
                setEventTime('');
                setDescription('');
                setRouteId('');
                setRoutes([]);

                setTimeout(() => {
                    navigate('/');
                }, 500);
            } else {
                alert('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleMouseEnter = (routeId) => {
        setHoveredRoute(routeId);
    };

    const handleMouseLeave = () => {
        setHoveredRoute(null);
    };

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="eventyay" onMouseMove={handleMouseMove}>
            <div className='eventcreation-container'>
                <h2 className="naslov">Create Event</h2>
                <form onSubmit={handleEventSubmit}>
                    <div className="eventName">
                        <label>Event name:</label>
                        <input 
                            type="text" 
                            name="eventName" 
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="eventTime">
                        <label>Event time:</label>
                        <input 
                            type="datetime-local"
                            name="eventTime"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="eventRoute">
                        <label>Route:</label>
                        <CustomDropdown 
                            options={routes.map(route => ({ value: route.route_id, label: route.route_name }))}
                            value={routeId}
                            onChange={setRouteId}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        {hoveredRoute && (
                            <div 
                                className="route-image-popup" 
                                style={{ 
                                    left: mousePosition.x + 20, 
                                    top: mousePosition.y - 305 // Adjust this value based on the image height
                                }}
                            >
                                <img src={`/images/route-${hoveredRoute}.png`} alt="Route" />
                            </div>
                        )}
                    </div>
                    <div className="shortDescription">
                        <label>Short Description:</label>
                        <textarea
                            name="shortDescription"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="description">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submitform">Create Event</button>
                </form>
            </div>
            <div>
                Mouse Position: {mousePosition.x}, {mousePosition.y}
            </div>
        </div>
    );
};

export default CreateEvent;