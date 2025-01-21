import '../components/clickedevent.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Leaderboard from '../components/leaderboard';
import ReviewForm from '../components/reviewform';
import fivestar from '../assets/5star.png';

type EventData = {
    event_id: string;
    short_description: string;
    organizer: string;
    event_name: string;
    event_time: string;
    route_id: string;
};

function ClickedEvent() {
    const { event_id } = useParams<{ event_id: string }>(); //iz URL vadi event_id
    const [event, setEvent] = useState<EventData>();
    const [isRouteSaved, setIsRouteSaved] = useState<boolean>(false);
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/event/${event_id}`); //fetcha event od backenda
                const data = await response.json();
                setEvent(data);

                const reviewsResponse = await fetch(`/api/route/reviews/${data.route_id}`);
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        const checkIfRouteSaved = async (routeId: string) => {
            try {
                const response = await fetch(`/api/route/saved/${routeId}`);
                const data = await response.json();
                setIsRouteSaved(data.saved);
            } catch (error) {
                console.error('Error checking if route is saved:', error);
            }
        };

        fetchEvent();
        if (event?.route_id) {
            checkIfRouteSaved(event.route_id);
        }
    }, [event_id, event?.route_id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

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
                setIsRouteSaved(true);
            } else {
                alert('Error saving route!');
            }
        } catch (error) {
            console.error('Error saving route:', error);
        }
    };

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
                setIsRouteSaved(false);
            } else {
                alert('Error unsaving route!');
            }
        } catch (error) {
            console.error('Error unsaving route:', error);
        }
    };

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
    };

    return (
        <div className="event">
            <div className="container-event">
                <div className="event-header">
                    <div className='buttons-left-container'>
                        <div>
                            <p className='nazivEvent'>{event?.event_name}</p>
                            <p className='vrijemeDatumEvent'>{event?.event_time ? formatDate(event.event_time) : 'Date not available'}</p>
                        </div>
                        <div>
                            <button className='buttonEvent' onClick={() => signUp(event?.event_id!)}>Sign up</button>
                            {isRouteSaved ? (
                                <button className='buttonEvent' onClick={() => unsaveRoute(event?.route_id!)}>Unsave route</button>
                            ) : (
                                <button className='buttonEvent' onClick={() => saveRoute(event?.route_id!)}>Save route</button>
                            )}
                        </div>
                    </div>
                    <p className='shortDescriptionEvent'>{event?.short_description}</p>
                </div>
                <div className='image-leaderbord'>
                    <img src={`/images/route-${event?.route_id}.png`} alt='Route Image' className='image-event' />
                    <div className='LEADERBORD'><Leaderboard eventId={event_id!} /></div>
                </div>
                <div className='reviews-container'>
                    <div className='reviews'>
                    {reviews.map((review) => (
                            <div className='review' key={review.id}>
                                <p className='review-text'>{review.comment}</p>
                                <p className='review-grader'>{review.grader_email}</p>
                            </div>
                        ))}
                    </div>
                    <div>{event && <ReviewForm eventId={event_id!} routeId={event.route_id} />}</div>
                </div>
            </div>
        </div>
    );
}

export default ClickedEvent;