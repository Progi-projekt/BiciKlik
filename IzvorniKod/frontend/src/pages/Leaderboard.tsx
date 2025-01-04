import React, { useState } from 'react';

type LeaderboardProps = {
  participants: { name: string; time: string }[];
  addParticipant: (name: string, time: string) => void;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ participants, addParticipant }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addParticipant(name, time);
    setName('');
    setTime('');
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            {participant.name}: {participant.time}
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
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Add Time</button>
      </form>
    </div>
  );
};

export default Leaderboard;