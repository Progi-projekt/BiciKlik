import React, { useState } from "react";
import '../components/createevent.css';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [description, setDescription] = useState('');
    const [routeId, setRouteId] = useState('');

    const handleEventSubmit = async (e: React.FormEvent) => {

    }

    return (
        <div className='eventcreation-container'>
            <h2>Create Event</h2>
            <form onSubmit={handleEventSubmit}>
                <div>
                    <label>Event name:</label>
                    <input type="text" 
                           name="eventName" 
                           value={eventName}
                           onChange={(e) => setEventName(e.target.value)}
                           required>
                    </input>
                </div>
                <div>
                    <label>Event time:</label>
                    <input type="datetime-local"
                           name="eventTime"
                           value={eventTime}
                           onChange={(e) => setEventTime(e.target.value)}
                           required>
                    </input>
                </div>
                <div>
                    <label>Route id:</label>
                    <input type="text"
                           name="routeId"
                           value={routeId}
                           onChange={(e) => setRouteId(e.target.value)}
                           required>
                    </input>
                </div>
                <div>
                    <label>Short Description:</label>
                    <textarea
                           name="shortDescription"
                           value={shortDescription}
                           onChange={(e) => setShortDescription(e.target.value)}
                           required>
                    </textarea>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                           name="description"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           required>
                    </textarea>
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default CreateEvent;
