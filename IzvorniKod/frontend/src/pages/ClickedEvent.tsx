import '../components/clickedevent.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Leaderboard from '../components/leaderboard';

type EventData = {
    event_id: string;
    short_description: string;
    organizer: string;
    event_name: string;
    event_time: string;
  };

function ClickedEvent() {
    const { event_id } = useParams<{event_id: string}>(); //iz URL vadi event_id
    const [event, setEvent] = useState<EventData>();    //za storeanje data

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/event/${event_id}`); //fetcha responce od backenda
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [event_id]);

    
    return ( //rendera event
        <div className="event">
            <div className="container-event">
                <p className='nazivEvent'>{event?.event_name}</p>
                <p className='vrijemeDatumEvent'>{event?.event_time}</p>
                <p className='shortDescriptionEvent'>{event?.short_description}</p>
                <img src={`/images/${event?.event_id}.PNG`} alt='Route Image' />
                <Leaderboard eventId={event_id!} />
            </div>
        </div>
    );
    }

export default ClickedEvent;