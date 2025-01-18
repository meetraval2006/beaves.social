"use client";

import { useState } from 'react';
import CreateDMCard from './CreateDMCard';
import CreateGroupDMCard from './CreateGroupDMCard';

interface CreateChatModalProps {
  onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Create Chat</h2>
        {!selectedOption ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedOption('dm')}
              className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Create DM
            </button>
            <button
              onClick={() => setSelectedOption('group')}
              className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Create Group DM
            </button>
          </div>
        ) : (
          <>
            {selectedOption === 'dm' && <CreateDMCard onClose={onClose} />}
            {selectedOption === 'group' && <CreateGroupDMCard onClose={onClose} />}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateChatModal;

