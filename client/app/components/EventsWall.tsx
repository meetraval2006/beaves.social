import { useState, useEffect } from 'react';

import EventCard from './EventCard';

export default function HomeUsersWall() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/get_events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    };
    
    fetchData();
  }, []);
  

  return (
    <div className="basis-10/12 p-2 grid xl:grid-cols-2 md:grid-cols-1 gap-6 items-stretch h-full">
      {data ? data.map((event) => <EventCard name={event.name} majors={event.majors} minors={event.minors} years={event.years} residence_halls={event.residence_halls} key={event.id} id={event.id} groupChatId={event.groupChatId}/>) : <div key="blank-screen"></div>}
    </div>
  )
}