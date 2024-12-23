import React, { useEffect, useState } from 'react';
import '../components/newsfeed.css'
import headerNewsFeed from '../assets/HeaderNewsFeed.png';
import { response } from 'express';
import { Link } from 'react-router-dom';

type EventData = {
  route_id: string;
  short_description: string;
  organizer: string;
  event_name: string;
  event_time: string;
};

const Newsfeed =() => {

  const [events, setEvents] = useState<EventData[]>([]);   //za storeanje data
  const [openFilter, setopenFilter] = useState(false); //za pop up za filter
  

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await fetch('https://biciklik.duckdns.org/event/get-recent'); //fetcha responce od backenda
        const data = await response.json();       
        setEvents(data);         //sprema data za State          
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

    return (
      <div className="newsfeed">
         <img src={headerNewsFeed} alt='NewsFeed' className='slikanews'/>
         <p className='filter' onClick={() => setopenFilter((prev) => !prev)} >Filter</p>
         {openFilter &&
         <div className='filter-drop-down'>
          <ul className='filter-drop-ul'>
            <li className='filter-drop-li'>Sort by: ...</li>
          </ul>
         </div>
         }
         <div className='containerRuta'>
          {events.map(event => (
            <Link to={`/event/${event.route_id}`} className="clickEvent" key={event.route_id}>
            <div className='ruta'>
            <div className='tekst'>
              <p className='nazivRute'>{event.event_name}</p>
              <p className="vrijemeDatum">{formatDate(event.event_time)}</p>
              <p>{event.short_description}</p>
              <img src={`https://biciklik.duckdns.org/images/${event.route_id}.PNG`} alt='RouteImg' className='slikarute' />
            </div>
          </div>
          </Link>
        ))} 
         </div>
      </div>
    );
  }
  export default Newsfeed;