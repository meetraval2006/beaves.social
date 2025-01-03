'use client'

import { useState } from 'react'
import { X, XCircle } from 'lucide-react'
import { on } from 'events'

interface ChatCreationPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatCreationPopup({ isOpen, onClose }: ChatCreationPopupProps) {
  const [isGc, setIsGc] = useState(false)
  const [gcName, setGcName] = useState('')
  const [users, setUsers] = useState<string[]>([''])
  const [messages, setMessages] = useState('') // Define the messages state variable

  const handleCreateChat = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      is_gc: isGc,
      gc_name: gcName,
      users: users, 
      messages: []
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/create_gc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log('Chat created successfully')
        // You might want to update the chat list or do something else here
      } else {
        console.error('Failed to create chat')
      }
    } catch (error) {
      console.error('Error creating chat:', error)
    }
    onClose()
  }

  const addUser = () => {
    const yourId = localStorage.getItem('id')
    setUsers([...users, ''])
  }

  const updateUser = (index: number, value: string) => {
    const newUsers = [...users]
    newUsers[index] = value
    setUsers(newUsers)
  }

  const removeUser = (index: number) => {
    const newUsers = users.filter((_, i) => i !== index)
    setUsers(newUsers.length ? newUsers : [''])
  }

  if (!isOpen) return null



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-300">Create New Chat</h2>
        <form onSubmit={handleCreateChat}>
          <div className="mb-4">
            <label className="block text-orange-300 mb-2">
              <input
                type="checkbox"
                checked={isGc}
                onChange={(e) => setIsGc(e.target.checked)}
                className="mr-2"
              />
              Group Chat
            </label>
          </div>
          {isGc && (
            <div className="mb-4">
              <label className="block text-orange-300 mb-2">
                Group Chat Name
                <input
                  type="text"
                  value={gcName}
                  onChange={(e) => setGcName(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-orange-300 rounded mt-1"
                  required
                />
              </label>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-orange-300 mb-2">Users</label>
            {users.map((user, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={user}
                  onChange={(e) => updateUser(index, e.target.value)}
                  className="flex-grow p-2 bg-gray-800 text-orange-300 rounded"
                  placeholder={`User ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeUser(index)}
                  className="ml-2 text-gray-400 hover:text-gray-200"
                  aria-label="Remove user"
                >
                  <XCircle size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addUser}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Add User
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Create Chat
          </button>
        </form>
      </div>
    </div>
  )
}

