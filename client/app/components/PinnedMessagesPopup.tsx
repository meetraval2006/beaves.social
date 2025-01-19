import { X } from 'lucide-react';

interface PinnedMessage {
  id: string;
  text: string;
  user_id: string;
  username?: string;
  timestamp: number;
}

interface PinnedMessagesPopupProps {
  messages: PinnedMessage[];
  onClose: () => void;
  isGroupChat: boolean;
}

const PinnedMessagesPopup: React.FC<PinnedMessagesPopupProps> = ({ messages, onClose, isGroupChat }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pinned Messages</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {messages.length === 0 ? (
          <p className="text-gray-500">No pinned messages</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="border-b pb-2">
                <p className="text-sm">{message.text}</p>
                {isGroupChat && (
                  <p className="text-xs text-gray-500 mt-1">{message.username}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(message.timestamp * 1000).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PinnedMessagesPopup;

