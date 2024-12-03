interface Message {
  text?: string;
  isPinned: boolean;
  likes: number;
  user_id: string;
  timestamp: number;
  isMine: boolean;
}

const myMessageCloud = (message: Message) => {
  const date = new Date(message.timestamp);
  const time = date.toLocaleTimeString();

  return (
    <div className="px-2 py-1">
      <div className="float-right flex items-center columns-2">
        <div style={{cursor: "default"}} className="text-sm mr-2 text-gray-400">{time}</div>
        <div className="bg-indigo-500 py-2 px-4 rounded-full">{message.text}</div>
      </div>
    </div>
  );
};
const otherMessageCloud = (message: Message) => {
  const date = new Date(message.timestamp);
  const time = date.toLocaleTimeString();

  return (
    <div className="px-2 py-1">
      <div>
        <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
      </div>
      <div className="float-left flex items-center columns-2">
        <div className="bg-gray-500 py-2 px-4 rounded-full">{message.text}</div>
        <div style={{cursor: "default"}} className="text-sm ml-2 text-gray-400">{time}</div>
      </div>
    </div>
  );
};

export default function MessageCloud(message: Message) {
  console.log(2, message)
  return message.isMine ? myMessageCloud(message) : otherMessageCloud(message);  
};