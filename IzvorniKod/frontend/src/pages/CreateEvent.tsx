import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../components/createevent.css';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [description, setDescription] = useState('');
    const [routeId, setRouteId] = useState('');

    const navigate = useNavigate();

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //zaustavja reload stranice

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

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                alert('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };



    return (
        <div className="eventyay">
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
                    <label>Route id:</label>
                    <input 
                        type="text"
                        name="routeId"
                        value={routeId}
                        onChange={(e) => setRouteId(e.target.value)}
                        required
                    />
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
        </div>
    );
};

export default CreateEvent;
