import React, { useEffect, useState, useRef } from 'react';
import './leaderboard.css';

type Participant = {
    name: string;
    achieved_result: string;
    email: string;
};

type LeaderboardProps = {
    eventId: string;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ eventId }) => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [eventStarted, setEventStarted] = useState(false);

    const minutesRef = useRef<HTMLInputElement>(null);
    const secondsRef = useRef<HTMLInputElement>(null);

    const fetchParticipants = async () => {
        try {
            const response = await fetch(`/api/event/${eventId}/leaderboard`); //fetcha response od backenda
            const data = await response.json();
            setParticipants(data);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    };

    const checkEventStatus = async () => {
        try{
            const response = await fetch(`/api/event/${eventId}`);
            const data = await response.json();
            const eventTime = new Date(data.event_time);
            const currentTime = new Date();

            if(eventTime < currentTime){
                setEventStarted(true);
            }else{
                setEventStarted(false);
            }
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    }
    

    useEffect(() => { // GET request za leaderboard (participants)
        fetchParticipants();
        checkEventStatus();
    }, [eventId]);

    const handleSubmit = async (e: React.FormEvent) => { // POST request za leaderboard (participants)
        e.preventDefault();
        const time = `${hours}:${minutes}:${seconds}`;
        try {
            if(!eventStarted){ 
                alert("Event has not started yet!");
                throw new Error("Event has not started yet!"); 
            }

            const response = await fetch(`/api/event/${eventId}/leaderboard`, {    //salje podatke na backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ time }),
            });
            const newParticipant = await response.json();
            
            // Format the time and include the name before updating the state
            const formattedParticipant = {
                ...newParticipant,
                achieved_result: time, // Assuming the backend returns the time in seconds
            };

            setParticipants([...participants, formattedParticipant]);
            setHours('');
            setMinutes('');
            setSeconds('');

            fetchParticipants(); // call after adding to display the updated leaderboard
        } catch (error) {
            console.error('Error adding participant:', error);
        }
    };

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {participants.map((participant, index) => (
                    <li key={index}>
                        {participant.name} - {participant.achieved_result}
                    </li>
                ))}
            </ul>

            <div className="add-participant-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="HH"
                    value={hours}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}$/.test(value)) {
                            setHours(value);
                            if (value.length === 2) {
                                minutesRef.current?.focus();
                            }
                        }
                    }}
                    required disabled={!eventStarted}
                />
                <input
                    type="text"
                    placeholder="MM"
                    value={minutes}
                    ref={minutesRef}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}$/.test(value) && (value === '' || parseInt(value) <= 59)) {
                            setMinutes(value);
                            if (value.length === 2) {
                                secondsRef.current?.focus();
                            }
                        }
                    }}
                    required disabled={!eventStarted}
                />
                <input
                    type="text"
                    placeholder="SS"
                    value={seconds}
                    ref={secondsRef}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}$/.test(value) && (value === '' || parseInt(value) <= 59)) {
                            setSeconds(value);
                        }
                    }}
                    required disabled={!eventStarted}
                />
                <input type="submit" value="Submit your time" disabled={!eventStarted}/>
            </form>
            </div>
        </div>
    );
};

export default Leaderboard;