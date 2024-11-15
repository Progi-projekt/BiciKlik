import React, { useEffect, useState } from 'react';
import '../components/newsfeed.css'
import headerNewsFeed from '../assets/HeaderNewsFeed.png';
import { response } from 'express';

type EventData = {
  route_id: string;
  short_description: string;
  organizer: string;
  event_name: string;
  event_time: string;
};

const Newsfeed =() => {

  const [events, setEvents] = useState<EventData[]>([]);   //za storeanje data

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

    return (
      <div className="newsfeed">
         <img src={headerNewsFeed} alt='NewsFeed' className='slikanews'/>
         <p className='filter'>Filter</p>
         <div className='containerRuta'>
          {events.map(event => (
            <div className='ruta' key={event.route_id}>
            <div className='tekst'>
              <p className='nazivRute'>{event.event_name}</p>
              <p className='vrijemeDatum'>{event.event_time}</p>
              <p>{event.short_description}</p>
              <img src={`https://biciklik.duckdns.org/images/${event.route_id}.PNG`} alt='RouteImg' className='slikarute' />
            </div>
          </div>
        ))} 
         </div>
      </div>
    );
  }
  export default Newsfeed;