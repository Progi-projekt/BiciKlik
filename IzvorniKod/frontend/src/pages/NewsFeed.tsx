import React, { useEffect, useState } from 'react';
import '../components/newsfeed.css'
import headerNewsFeed from '../assets/HeaderNewsFeed.png';
import { response } from 'express';

type EventData = {
  created_time: string;
  event_time: string;
  description: string;
  event_id: number;
  event_name: string;
  route_id: number;
  organizer_email: string;
};

const Newsfeed =() => {

  const [events, setEvents] = useState<EventData[]>([]);   //za storeanje data

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await fetch('https://biciklik.duckdns.org/mock/get-ten'); //fetcha responce od backenda
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
            <div className='ruta' key={event.event_id}>
            <div className='tekst'>
              <p className='nazivRute'>{event.event_name}</p>
              <p className='vrijemeDatum'>{event.event_time}</p>
              <p>{event.description}</p>
              <img src={`https://biciklik.duckdns.org/images/${event.route_id}.PNG}`} alt='RouteImg' className='slikarute' />
            </div>
          </div>
        ))}
          run 
         </div>
      </div>
    );
  }
  export default Newsfeed;