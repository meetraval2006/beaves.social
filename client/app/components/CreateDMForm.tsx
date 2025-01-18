"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreateDMForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/get_users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleUserSelect = async (selectedUser) => {
    const currentUserId = localStorage.getItem('id');
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
    router.push(`/chat/${data.gc_id}`);
  };

  return (
    <div className="mt-2 p-2 bg-white rounded-md shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="w-full p-2 border rounded-md"
      />
      <ul className="mt-2 max-h-40 overflow-y-auto">
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

export default CreateDMForm;

