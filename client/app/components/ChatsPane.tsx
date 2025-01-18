import { useState, useEffect } from 'react';

import ChatUserSelect from "./ChatUserSelect";

export default function ChatsPane() {
  const [data, setData] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("id"));

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
    <div className="px-2 pb-4 pt-2 overflow-y-auto ">
      <ul className="font-medium ">
        {Object.keys(data).map((key) => {
          if (userId && data[key].users && data[key].users.includes(userId)) { // Check if userId exists and is in users array
            const latestMessage = data[key].messages?.length ? data[key].messages[data[key].messages.length - 1] : null;
            return (
              <ChatUserSelect
                key={key}
                id={key}
                username={data[key].gc_name}
                latestMessageAuthor={latestMessage ? latestMessage.user_id : ""}
                latestMessageText={latestMessage ? latestMessage.text : ""}
                isMessage={!!latestMessage}
                users={data[key].users}
                isGc={data[key].is_gc}
              />
            );
          }
          return null; // Return null if userId is not in users array
        })}
      </ul>
    </div>
  );
}

