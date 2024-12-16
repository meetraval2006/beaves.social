import { useState, useEffect } from 'react';

export default function ChatMessagesWindow({ chatId }: { chatId: string }) {
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [gcNameUserId, setGcNameUserId] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/get_gc?chat_id=" + chatId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [chatId]);

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    if (data && !data.is_gc && data.users && data.users.length >= 2) {
      const gcNameUserIdTemp = (data.users[0] === localStorage.getItem("id")) ? data.users[1] : data.users[0];
      setGcNameUserId(gcNameUserIdTemp);
    }
  }, [data]);

  let gcName;
  if (data?.is_gc) {
    gcName = data.gc_name;
  }

  return (
    <div>
      {/* Render your component UI here */}
    </div>
  );
}