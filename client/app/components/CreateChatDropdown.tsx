"use client";

import { useState } from 'react';
import CreateDMForm from './CreateDMForm';
import CreateGroupDMForm from './CreateGroupDMForm';

const CreateChatDropdown = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button
          onClick={() => setSelectedOption('dm')}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
          role="menuitem"
        >
          Create DM
        </button>
        <button
          onClick={() => setSelectedOption('group')}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
          role="menuitem"
        >
          Create Group DM
        </button>
      </div>
      {selectedOption === 'dm' && <CreateDMForm />}
      {selectedOption === 'group' && <CreateGroupDMForm />}
    </div>
  );
};

export default CreateChatDropdown;

