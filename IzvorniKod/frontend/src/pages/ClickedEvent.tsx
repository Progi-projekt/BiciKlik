import '../components/clickedevent.css';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Leaderboard from './Leaderboard';

type EventData = {
type EventData = {
    event_name: string;
    event_time: string;
    short_description: string;
    route_id: string;
    organizer: string;
  };

  const initialParticipants = [ //za testiranje leaderboarda
    { name: 'John Doe', time: '1:23:45' },
    { name: 'Jane Smith', time: '1:25:30' },
  ];

function ClickedEvent() {
    const { route_id } = useParams<{route_id: string}>(); //iz URL vadi route_id
    const [events, setEvents] = useState<EventData>();    //za storeanje data
    const [participants, setParticipants] = useState(initialParticipants); // State for participants
    const [showLeaderboard, setShowLeaderboard] = useState(false); // state for leaderboard visibility

    const toggleLeaderboard = () => {
      setShowLeaderboard(!showLeaderboard);};
    
    const addParticipant = (name: string, time: string) => {
      setParticipants([...participants, { name, time }]);
    };

     return (
        <div className="event">
          <div className="container-event">
            <p className='nazivEvent'>{events?.event_name}</p>
            <p className='vrijemeDatumEvent'>{events?.event_time}</p>
            <p className='shortDescriptionEvent'>{events?.short_description}</p>
            <img src={`https://biciklik.duckdns.org/images/${events?.route_id}.PNG`} alt="Event"/>
            <button onClick={toggleLeaderboard}>
              {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
            </button>
            {showLeaderboard && <Leaderboard participants={participants}  addParticipant={addParticipant}/>}
          </div>
        </div>
      );
    }

/* function ClickedEvent() {
    const { route_id } = useParams<{route_id: string}>(); //iz URL vadi route_id
    const [showLeaderboard, setShowLeaderboard] = useState(false); // state for leaderboard visibility

    const toggleLeaderboard = () => {
      setShowLeaderboard(!showLeaderboard);
    };
    
    return(
        <div className="event">
            <div className="container-event">
            <p className='nazivEvent'>Naziv Rute</p>
            <p className='vrijemeDatumEvent'>Vrijeme Datum</p>
            <p className='shortDescriptionEvent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img></img>
            </div>
        </div>
    );
} */

export default ClickedEvent;