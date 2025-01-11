import '../components/clickedevent.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Leaderboard from '../components/leaderboard';
import ReviewForm from '../components/reviewform';

type EventData = {
    event_id: string;
    short_description: string;
    organizer: string;
    event_name: string;
    event_time: string;
    route_id: string; 
};

function ClickedEvent() { //funkcija za getanje eventa
    const { event_id } = useParams<{ event_id: string }>(); //iz URL vadi event_id
    const [event, setEvent] = useState<EventData>(); 

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/event/${event_id}`); //fetcha event od backenda
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [event_id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)    
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return ( //rendera event
        <div className="event">
            <div className="container-event">
                <p className='nazivEvent'>{event?.event_name}</p>
                <p className='vrijemeDatumEvent'>{event?.event_time ? formatDate(event.event_time) : 'Date not available'}</p>
                <p className='shortDescriptionEvent'>{event?.short_description}</p>
                <img src={`/images/${event?.event_id}.PNG`} alt='Route Image' className='image-event'/>
                <div className='leaderboard-reviews'>
                <div><Leaderboard eventId={event_id!}/></div>
                <div>{event && <ReviewForm eventId={event_id!} routeId={event.route_id} />}</div>
                </div>
            </div>
        </div>
    );
}

export default ClickedEvent;