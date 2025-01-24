import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import '../components/newsfeed.css';
import headerNewsFeed from '../assets/HeaderNewsFeed.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

type EventData = {
  event_id: string;
  route_id: string;
  short_description: string;
  organizer: string;
  event_name: string;
  event_time: string;
};

const Newsfeed = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<EventData[]>([]);
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events for the main list
        const response = await fetch('/api/event/getEvents');
        const data = await response.json();
        setEvents(data);

        // Fetch all events for fuzzy search
        const allEventsResponse = await fetch('/api/event/getAllEvents');
        const allEventsData = await allEventsResponse.json();
        setAllEvents(allEventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEvents();
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(allEvents, {
      keys: ['event_name'], // Search by event name
      threshold: 0.3,       // Adjust to allow some "fuzziness"
    });

    const results = fuse.search(query).map(result => result.item);
    setSearchResults(results);
  };

  const handleResultClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="newsfeed">
      <img src={headerNewsFeed} alt='NewsFeed' className='slikanews' />

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for events..."
          className="search-input"
        />
        {searchResults.length > 0 && (
          <div className="search-dropdown">
            <ul>
              {searchResults.map(event => (
                <li
                  key={event.event_id}
                  onClick={() => handleResultClick(event.event_id)}
                  className="search-result-item"
                >
                  {event.event_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='containerRuta'>
        {events.map(event => (
          <Link to={`/event/${event.event_id}`} className="clickEvent" key={event.event_id}>
            <div className='ruta'>
              <div className='tekst'>
                <p className='nazivRute'>{event.event_name}</p>
                <p className="vrijemeDatum">{formatDate(event.event_time)}</p>
                <p>{event.short_description}</p>
                <img src={`/images/route-${event.route_id}.png`} alt='RouteImg' className='slikarute' />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
