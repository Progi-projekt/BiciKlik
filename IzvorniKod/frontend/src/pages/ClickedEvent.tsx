import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Leaderboard from '../components/leaderboard'; // Adjust the import path
import '../components/clickedevent.css'; // Import the CSS file for styling

type EventData = {
    event_name: string;
    event_time: string;
    short_description: string;
    route_id: string;
    organizer: string;
};

function ClickedEvent() {
    const { id: route_id } = useParams<{id: string}>(); // Extract route_id from URL
    const [events, setEvents] = useState<EventData>(); // State to store event data
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        if (!route_id) {
            console.error('route_id is undefined');
            return;
        }

        const fetchEvent = async () => {
            try {
                console.log(`Fetching event data for route_id: ${route_id}`);
                const response = await fetch(`http://localhost:3000/event/${route_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Received non-JSON response');
                }
                const data = await response.json();
                console.log('Fetched event data:', data);
                setEvents(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching event data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchEvent();
    }, [route_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="event">
            <div className="container-event">
                <div className="event-details">
                    <p className="nazivEvent">{events?.event_name}</p>
                    <p className="vrijemeDatumEvent">{events?.event_time}</p>
                    <p className="shortDescriptionEvent">{events?.short_description}</p>
                    <img src={`https://biciklik.duckdns.org/images/${events?.route_id}.PNG`} alt="Event" />
                </div>
                <div className="leaderboard-container">
                    <Leaderboard eventId={route_id || ''} />
                </div>
            </div>
        </div>
    );
}

export default ClickedEvent;