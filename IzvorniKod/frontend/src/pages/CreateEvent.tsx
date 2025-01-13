import React, { useState } from "react";
import '../components/createevent.css';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [description, setDescription] = useState('');
    const [routeId, setRouteId] = useState('');

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //zaustavja reload stranice
        console.log("Event Name:", eventName);
        console.log("Short Description:", shortDescription);
        console.log("Event Time:", eventTime);
        console.log("Description:", description);
        console.log("Route ID:", routeId);
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
