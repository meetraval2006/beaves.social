import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { useRouter, redirect } from 'next/navigation';

export default function HomeUsersWall() {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

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
    <div className="flex flex-col w-full">
      

      <div className="basis-10/12 p-2 grid xl:grid-cols-2 md:grid-cols-1 gap-6 items-stretch h-full">
        {data ? data.map((event) => (
          <motion.div
            key={event.id}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            transition={{ duration: 0.3 }}
          >
            <EventCard
              name={event.name}
              majors={event.majors}
              minors={event.minors}
              years={event.years}
              residence_halls={event.residence_halls}
              id={event.id}
              key={event.id}
              groupChatId={event.groupChatId}
            />
          </motion.div>
        )) : <div key="blank-screen"></div>}
      </div>
    </div>
  )
}

