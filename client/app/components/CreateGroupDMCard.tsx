"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

interface User {
  id: string
  username: string
}

interface CreateGroupDMCardProps {
  onClose: () => void
}

const CreateGroupDMCard: React.FC<CreateGroupDMCardProps> = ({ onClose }) => {
  const [groupName, setGroupName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get_users")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        const currentUserId = localStorage.getItem("id")
        setUsers(data.filter((user) => user.id !== currentUserId))
      } catch (error) {
        console.error("Error fetching users:", error)
        setError("Failed to fetch users. Please try again.")
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedUsers.some((selectedUser) => selectedUser.id === user.id),
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users, selectedUsers])

  const handleUserSelect = (user: User) => {
    setSelectedUsers([...selectedUsers, user])
    setSearchTerm("")
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId))
  }

  const handleCreateGroup = async () => {
    setError(null)
    if (groupName.length > 100) {
      setError("Group name must be 100 characters or less")
      return
    }

    if (selectedUsers.length < 1) {
      setError("Please select at least one user")
      return
    }

    const currentUserId = localStorage.getItem("id")
    if (!currentUserId) {
      setError("User ID not found. Please log in again.")
      return
    }

    const userIds = [currentUserId, ...selectedUsers.map((user) => user.id)]

    try {
      const response = await fetch("http://127.0.0.1:5000/api/create_gc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gc_name: groupName,
          is_gc: true,
          users: userIds,
          messages: [],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create group chat")
      }

      const data = await response.json()
      if (!data || !data.gc_id) {
        throw new Error("Invalid response from server")
      }

      onClose()
      router.push(`/you/chats/${data.gc_id}`)
    } catch (error) {
      console.error("Error creating group chat:", error)
      setError("Failed to create group chat. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Create Group Chat</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group name (max 100 characters)"
        className="w-full p-2 border rounded-md"
        maxLength={100}
      />
      <div className="flex flex-wrap gap-2">
        {selectedUsers.map((user) => (
          <div key={user.id} className="bg-gray-200 px-2 py-1 rounded-full flex items-center">
            <span>{user.username}</span>
            <button onClick={() => handleRemoveUser(user.id)} className="ml-2 text-red-500">
              ×
            </button>
          </div>
        ))}
      </div>
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
          <li key={user.id} onClick={() => handleUserSelect(user)} className="p-2 hover:bg-gray-100 cursor-pointer">
            {user.username}
          </li>
        ))}
      </ul>
      <button
        onClick={handleCreateGroup}
        className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
      >
        Create Group
      </button>
    </div>
  )
}

export default CreateGroupDMCard

