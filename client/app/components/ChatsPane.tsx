import { useState, useEffect } from 'react';

import ChatUserSelect from "./ChatUserSelect"

export default function ChatsPane() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/get_gcs", {
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
    <div className="px-2 pb-4 pt-2 overflow-y-auto">
      <ul className="font-medium">
        {Object.keys(data).map((key) => {
          return <ChatUserSelect key={key} username={data[key].gc_name} latestMessageAuthor={data[key].messages?.length ? "0" : ""} latestMessageText={data[key].messages?.length ? "0" : ""} isMessage={data[key].messages?.length} />
        })}
    </ul>
    </div>
  )
};