"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
}

interface CreateDMCardProps {
  onClose: () => void;
}

const CreateDMCard: React.FC<CreateDMCardProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [existingChats, setExistingChats] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/get_users');
      const data = await response.json();
      const currentUserId = localStorage.getItem('id');
      setUsers(data.filter(user => user.id !== currentUserId));
    };
    fetchUsers();

    const fetchExistingChats = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/get_gcs');
      const data = await response.json();
      const currentUserId = localStorage.getItem('id');
      const chats: Record<string, string> = {};
      
      Object.entries(data).forEach(([chatId, chatData]: [string, any]) => {
        if (!chatData.is_gc && chatData.users.includes(currentUserId)) {
          const otherUserId = chatData.users.find(id => id !== currentUserId);
          chats[otherUserId] = chatId;
        }
      });
      setExistingChats(chats);
    };
    fetchExistingChats();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleUserSelect = async (selectedUser: User) => {
    const currentUserId = localStorage.getItem('id');
    
    // Check if a chat already exists with the selected user
    if (existingChats[selectedUser.id]) {
      onClose();
      router.push(`${existingChats[selectedUser.id]}`);
      return;
    }

    const response = await fetch('http://127.0.0.1:5000/api/create_gc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gc_name: `${currentUserId}_${selectedUser.id}`,
        is_gc: false,
        users: [currentUserId, selectedUser.id],
        messages: []
      }),
    });
    const data = await response.json();
    onClose();
    router.push(`/chat/${data.gc_id}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Create Direct Message</h3>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="w-full p-2 border rounded-md"
          list="user-list"
        />
        <datalist id="user-list">
          {filteredUsers.map((user) => (
            <option key={user.id} value={user.username} />
          ))}
        </datalist>
      </div>
      <ul className="max-h-40 overflow-y-auto">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserSelect(user)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateDMCard;

