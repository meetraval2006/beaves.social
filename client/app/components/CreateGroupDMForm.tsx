"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const CreateGroupDMForm = () => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
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
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedUsers.some(selectedUser => selectedUser.id === user.id)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users, selectedUsers]);

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchTerm('');
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  };

  const handleCreateGroup = async () => {
    if (groupName.length > 100) {
      alert('Group name must be 100 characters or less');
      return;
    }

    if (selectedUsers.length < 1) {
      alert('Please select at least one user');
      return;
    }

    const currentUserId = localStorage.getItem('id');
    const userIds = [currentUserId, ...selectedUsers.map(user => user.id)];

    const response = await fetch('http://127.0.0.1:5000/api/create_gc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gc_name: groupName,
        is_gc: true,
        users: userIds,
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
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group name (max 100 characters)"
        className="w-full p-2 border rounded-md mb-2"
        maxLength={100}
      />
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedUsers.map((user) => (
          <div key={user.id} className="bg-gray-200 px-2 py-1 rounded-full flex items-center">
            <span>{user.username}</span>
            <button onClick={() => handleRemoveUser(user.id)} className="ml-2 text-red-500">×</button>
          </div>
        ))}
      </div>
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
      <button
        onClick={handleCreateGroup}
        className="mt-2 w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroupDMForm;

