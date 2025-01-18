import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

export default function EventsWall() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get_events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    setUserId(localStorage.getItem('id') || '');
  }, []);

  const handleDeleteEvent = (deletedEventId) => {
    setEvents(events.filter(event => event.id !== deletedEventId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          userId={userId}
          onDelete={handleDeleteEvent}
        />
      ))}
    </div>
  );
}

