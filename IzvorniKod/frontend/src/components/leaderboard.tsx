import React, { useEffect, useState } from 'react';
import './leaderboard.css';
type Participant = {
    name: string;
    time: string;
};

type LeaderboardProps = {
    eventId: string;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ eventId }) => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [name, setName] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`http://localhost:3000/leaderboard/${eventId}`);
                const data = await response.json();
                setParticipants(data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchParticipants();
    }, [eventId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, time, eventId }),
            });
            const newParticipant = await response.json();
            setParticipants([...participants, newParticipant]);
            setName('');
            setTime('');
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
                        {participant.name} - {participant.time}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="time"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <input type="submit" value="Add Participant" />
            </form>
        </div>
    );
};

export default Leaderboard;