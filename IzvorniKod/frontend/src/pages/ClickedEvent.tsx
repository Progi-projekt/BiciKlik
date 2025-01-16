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
                const response = await fetch(`/api/event/${event_id}`); //fetcha event od backenda
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
    console.log(event);

    const saveRoute = async (route_id: string) => {
        try {
            const response = await fetch(`/api/route/saveRoute/${route_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Route saved successfully!');
            } else {
                alert('Error saving route!');
            }
        } catch (error) {
            console.error('Error saving route:', error);
        }
    }

    const signUp = async (event_id: string) => {
        try {
            const response = await fetch(`/api/event/signup/${event_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Signed up successfully!');
            } else {
                alert('Error signing up!');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    return ( //rendera event
        <div className="event">
            <div className="container-event">
                <div className="event-header">
                    <p className='nazivEvent'>{event?.event_name}</p>
                    <button className='buttonEvent' onClick={() => signUp(event?.event_id!)}>Sign up</button>
                    <button className='buttonEvent' onClick={() => saveRoute(event?.route_id!)}>Save route</button>
                    <p className='vrijemeDatumEvent'>{event?.event_time ? formatDate(event.event_time) : 'Date not available'}</p>
                    <p className='shortDescriptionEvent'>{event?.short_description}</p>
                </div>
                <img src={`/images/route-${event?.route_id}.png`} alt='Route Image' className='image-event'/>
                <div className='leaderboard-reviews'>
                <div className='LEADERBORD'><Leaderboard eventId={event_id!}/></div>
                <div>{event && <ReviewForm eventId={event_id!} routeId={event.route_id} />}</div>
                </div>
            </div>
        </div>
    );
}

export default ClickedEvent;