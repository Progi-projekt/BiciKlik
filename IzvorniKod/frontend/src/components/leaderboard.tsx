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

    const minutesRef = useRef<HTMLInputElement>(null);
    const secondsRef = useRef<HTMLInputElement>(null);

    useEffect(() => { // GET request za leaderboard (participants)
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`/event/leaderboard/${eventId}`); //fetcha response od backenda
                const data = await response.json();
                const participants = JSON.stringify(data, null, 2)
                console.log("participants: " + participants);
                setParticipants(data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchParticipants();
    }, [eventId]);

    const handleSubmit = async (e: React.FormEvent) => { // POST request za leaderboard (participants)
        e.preventDefault();
        const time = `${hours}:${minutes}:${seconds}`;
        try {
            const response = await fetch(`/event/leaderboard/${eventId}`, {    //salje podatke na backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ time }),
            });
            const newParticipant = await response.json();
            setParticipants([...participants, newParticipant]);
            setHours('');
            setMinutes('');
            setSeconds('');
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
                    required
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
                    required
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
                    required
                />
                <input type="submit" value="Submit your time" />
            </form>
            </div>
        </div>
    );
};

export default Leaderboard;