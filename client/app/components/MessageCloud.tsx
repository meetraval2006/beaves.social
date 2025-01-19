import { useState } from 'react';
import { ThumbsUp, MoreVertical, Pin } from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  isPinned: boolean;
  likes: number;
  user_id: string;
  username?: string;
  timestamp: number;
  isMine: boolean;
  isGroupChat: boolean;
}

interface MessageCloudProps {
  message: Message;
  onLike: (id: string) => void;
  onPin: (id: string) => void;
}

const MessageCloud: React.FC<MessageCloudProps> = ({ message, onLike, onPin }) => {
  const [showOptions, setShowOptions] = useState(false);
  const date = new Date(message.timestamp * 1000);
  const time = date.toLocaleTimeString();

  const handleDoubleClick = () => {
    console.log(`Double-click like on message: ${message.id}`);
    onLike(message.id);
  };

  const handlePinClick = () => {
    console.log(`Pin/Unpin message: ${message.id}`);
    onPin(message.id);
  };

  const handleLikeClick = () => {
    console.log(`Like/Unlike message: ${message.id}`);
    onLike(message.id);
  };

  const toggleOptions = () => {
    console.log(`Toggling options for message: ${message.id}`);
    setShowOptions(!showOptions);
  };

  const optionsButton = (
    <button 
      onClick={toggleOptions} 
      className={`text-gray-500 hover:text-gray-700 ${message.isMine ? 'order-last ml-2' : 'order-first mr-1'}`}
    >
      <MoreVertical size={16} />
    </button>
  );

  const optionsMenu = showOptions && (
    <div className={`absolute ${message.isMine ? 'right-0' : 'left-2'} top-full mt-1 bg-white rounded shadow-lg z-10`}>
      <button onClick={handlePinClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        {message.isPinned ? 'Unpin' : 'Pin'}
      </button>
      <button onClick={handleLikeClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        {message.likes > 0 ? 'Unlike' : 'Like'}
      </button>
    </div>
  );

  const messageContent = (
    <div 
      className={`py-2 px-4 rounded-full ${message.isMine ? 'bg-indigo-500 text-white' : 'bg-gray-500 text-white'} relative`}
      onDoubleClick={handleDoubleClick}
    >
      {message.text}
      {message.likes > 0 && (
        <span className="ml-2 text-sm flex items-center">
          <ThumbsUp size={12} /> {message.likes}
        </span>
      )}
    </div>
  );

  if (message.isMine) {
    return (
      <div className="px-2 py-1">
        <div className="float-right flex items-center columns-2">
          <div style={{cursor: "default"}} className="text-sm mr-2 text-gray-400">{time}</div>
          <div className="flex items-center relative">
            {messageContent}
            {optionsButton}
            {optionsMenu}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-2 py-1">
        <div>
          <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-2 ms-2 rounded-full" alt="user-avatar"/>
        </div>
        <div className="float-left flex flex-col">
          <div className="flex items-center columns-2 relative">
            {optionsButton}
            {messageContent}
            <div style={{cursor: "default"}} className="text-sm ml-2 text-gray-400">{time}</div>
            {optionsMenu}
          </div>
          {message.isGroupChat && !message.isMine && (
            <div className="text-xs text-gray-500 mt-1 ml-6">{message.username}</div>
          )}
        </div>
      </div>
    );
  }
};

export default MessageCloud;

