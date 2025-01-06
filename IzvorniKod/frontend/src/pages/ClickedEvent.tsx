import '../components/clickedevent.css';
import Leaderboard from '../components/leaderboard';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

type EventData = {
    route_id: string;
    short_description: string;
    organizer: string;
    event_name: string;
    event_time: string;
  };

function ClickedEvent() {
    const { route_id } = useParams<{route_id: string}>(); //iz URL vadi route_id
    const [events, setEvents] = useState<EventData>();    //za storeanje data

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/event/${route_id}`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [route_id]);

    
    return (
        <div className="event">
            <div className="container-event">
                <p className='nazivEvent'>{events?.event_name}</p>
                <p className='vrijemeDatumEvent'>{events?.event_time}</p>
                <p className='shortDescriptionEvent'>{events?.short_description}</p>
                <img src={`/images/${events?.route_id}.PNG`} alt='Route Image' />
                <Leaderboard eventId={route_id!} />
            </div>
            
        </div>
    );
    }

export default ClickedEvent;