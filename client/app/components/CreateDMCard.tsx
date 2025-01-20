"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
}

interface CreateDMCardProps {
  onClose: () => void
}

const CreateDMCard: React.FC<CreateDMCardProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [existingChats, setExistingChats] = useState<Record<string, string>>({})
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

    const fetchExistingChats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get_gcs")
        if (!response.ok) {
          throw new Error("Failed to fetch existing chats")
        }
        const data = await response.json()
        const currentUserId = localStorage.getItem("id")
        const chats: Record<string, string> = {}

        if (data && typeof data === "object") {
          Object.entries(data).forEach(([chatId, chatData]: [string, any]) => {
            if (chatData && !chatData.is_gc && chatData.users && chatData.users.includes(currentUserId)) {
              const otherUserId = chatData.users.find((id) => id !== currentUserId)
              if (otherUserId) {
                chats[otherUserId] = chatId
              }
            }
          })
        }
        setExistingChats(chats)
      } catch (error) {
        console.error("Error fetching existing chats:", error)
        setError("Failed to fetch existing chats. Please try again.")
      }
    }
    fetchExistingChats()
  }, [])

  useEffect(() => {
    const filtered = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const handleUserSelect = async (selectedUser: User) => {
    setError(null)
    const currentUserId = localStorage.getItem("id")
    if (!currentUserId) {
      setError("User ID not found. Please log in again.")
      return
    }

    // Check if a chat already exists with the selected user
    if (existingChats[selectedUser.id]) {
      onClose()
      router.push(`/you/chats/${existingChats[selectedUser.id]}`)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/create_gc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gc_name: `${currentUserId}_${selectedUser.id}`,
          is_gc: false,
          users: [currentUserId, selectedUser.id],
          messages: [],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create chat")
      }

      const data = await response.json()
      if (!data || !data.gc_id) {
        throw new Error("Invalid response from server")
      }

      onClose()
      router.push(`/you/chats/${data.gc_id}`)
    } catch (error) {
      console.error("Error creating chat:", error)
      setError("Failed to create chat. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Create Direct Message</h3>
      {error && <p className="text-red-500">{error}</p>}
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
    </div>
  )
}

export default CreateDMCard

