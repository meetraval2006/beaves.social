import { useState, useEffect } from 'react';

import ChatUserSelect from "./ChatUserSelect";

interface ChatData {
  [key: string]: {
    gc_name: string;
    messages: {
      user_id: string;
      text: string;
    }[];
  };
}

export default function ChatsPane() {
  const [data, setData] = useState<ChatData>({});

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
          const latestMessage = data[key].messages?.length ? data[key].messages[data[key].messages.length - 1] : null;
          return (
            <ChatUserSelect
              key={key}
              id={key}
              username={data[key].gc_name}
              latestMessageAuthor={latestMessage ? latestMessage.user_id : ""}
              latestMessageText={latestMessage ? latestMessage.text : ""}
              isMessage={!!latestMessage}
            />
          );
        })}
      </ul>
    </div>
  );
}