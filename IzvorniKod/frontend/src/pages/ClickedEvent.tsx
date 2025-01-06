
import '../components/clickedevent.css';
import React from 'react';
import { useParams } from 'react-router-dom';
//import React, { useEffect, useState } from 'react';

/*type EventData = {
    route_id: string;
    short_description: string;
    organizer: string;
    event_name: string;
    event_time: string;
  };

function ClickedEvent() {
    const { route_id } = useParams<{route_id: string}>(); //iz URL vadi route_id
    const [events, setEvents] = useState<EventData>();    //za storeanje data

    
     return (
        <div className="event">
          <div className="container-event">
            <p className='nazivEvent'>{events.event_name}</p>
            <p className='vrijemeDatumEvent'>{events.event_time}</p>
            <p className='shortDescriptionEvent'>{events.short_description}</p>
            <img 
              src={`/images/${events.route_id}.PNG`} 
            />
          </div>
        </div>
      );
    }
*/
function ClickedEvent() {
    const { route_id } = useParams<{route_id: string}>(); //iz URL vadi route_id
    
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
}


export default ClickedEvent;