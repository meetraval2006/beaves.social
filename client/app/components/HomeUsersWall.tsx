import { useState, useEffect } from 'react';

import HomeUserSelect from "./HomeUserSelect"


export default function HomeUsersWall() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/get_users", {
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
    <>
        <div className="basis-10/12 p-2 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6 items-stretch h-full">
          {data ? data.map((user) => {
            return <button>
              <HomeUserSelect 
              username={user.username} 
              key={user.id} 
              id={user.id} 
              name={user.name} 
              email={user.email}
              major={user.major}
              minor={user.minor}
              year={user.year}
              residence_hall={user.residence_hall}
              />
            </button>
          }) : <div key="blank-screen"></div>}
        </div>
    </>
  )
}