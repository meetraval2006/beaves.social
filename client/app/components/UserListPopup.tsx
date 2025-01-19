"use client";

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

interface User {
    id: string;
    username: string;
}

interface UserListPopupProps {
    chatId: string;
    users: string[];
    onClose: () => void;
    currentUserId: string;
    onUpdate: () => Promise<void>;
}

export default function UserListPopup({ chatId, users, onClose, currentUserId, onUpdate }: UserListPopupProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/get_users');
            const data = await response.json();
            setAllUsers(data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = allUsers.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !users.includes(user.id)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, allUsers, users]);

    const handleAddUser = useCallback(async (userId: string, username: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/add_user_to_gc?chat_id=${chatId}&user_id=${userId}`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error(`Failed to add user. Status: ${response.status}`);
            }

            await onUpdate();
            toast.success(`${username} added to the group chat!`);
            setSearchTerm('');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user.');
        }
    }, [chatId, onUpdate]);

    const handleRemoveUser = useCallback(async (userId: string, username: string) => {
        if (window.confirm(`Are you sure you want to remove ${username}?`)) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/remove_user_from_gc?chat_id=${chatId}&user_id=${userId}`, {
                    method: 'PUT'
                });

                if (!response.ok) {
                    throw new Error(`Failed to remove user. Status: ${response.status}`);
                }

                await onUpdate();
                toast.success(`${username} removed from the group chat.`);
            } catch (error) {
                console.error('Error removing user:', error);
                toast.error('Failed to remove user.');
            }
        }
    }, [chatId, onUpdate]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-orange-300">Group Chat Members</h2>
                <div className="mb-4">
                    <label htmlFor="addUser" className="block text-orange-300 mb-2">Add User</label>
                    <input
                        type="text"
                        id="addUser"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..."
                        className="w-full p-2 bg-gray-800 text-orange-300 rounded mt-1"
                    />
                    <ul className="mt-2">
                        {filteredUsers.map((user) => (
                            <li key={user.id} className="cursor-pointer p-2 hover:bg-gray-800 text-white" onClick={() => handleAddUser(user.id, user.username)}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
                <ul>
                    {users.map((userId) => {
                        const userObject = allUsers.find(user => user.id === userId);
                        if (userObject) {
                            return (
                                <li key={userId} className="flex items-center justify-between p-2 hover:bg-gray-800">
                                    <span className="text-orange-300">{userObject.username}</span>
                                    <button
                                        onClick={() => handleRemoveUser(userId, userObject.username)}
                                        className="text-red-500 hover:text-red-600"
                                        disabled={userId === currentUserId}
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
}

