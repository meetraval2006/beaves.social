"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface Options {
  id: string
  username: string
  latestMessageAuthor: string
  latestMessageText: string
  isMessage: boolean
  users: string[]
  isGc: boolean
  isActive: boolean
  unreadCount: number
  onClearUnread: (chatId: string) => void
}

export default function ChatUserSelect(options: Options) {
  const router = useRouter()
  const { id, latestMessageAuthor, latestMessageText, unreadCount, onClearUnread } = options
  const [displayName, setDisplayName] = useState(options.isGc ? options.username : "")

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (unreadCount > 0) {
      onClearUnread(id)
    }
    router.push(`/you/chats/${id}`)
  }

  useEffect(() => {
    const fetchOtherUsername = async () => {
      if (!options.isGc) {
        const currentUserId = localStorage.getItem("id")
        const otherUserId = options.users.find((id) => id !== currentUserId)

        if (otherUserId) {
          try {
            const response = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${otherUserId}`)
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const userData = await response.json()

            if (userData && userData.username) {
              setDisplayName(userData.username)
            } else {
              console.error("Username not found in user data:", userData)
            }
          } catch (error) {
            console.error("Error fetching user data:", error)
          }
        }
      }
    }

    fetchOtherUsername()
  }, [options.isGc, options.users])

  return (
    <li className="mb-2">
      <a
        onClick={handleClick}
        className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          options.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
      >
        <img
          src="https://i.pinimg.com/736x/71/39/e2/7139e287d3f84a3691a38ecb048aa9f7.jpg"
          className="w-10 h-10 rounded-full mr-3"
          alt="user-avatar"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-orange-400 truncate">{displayName}</p>
          <p className="text-xs text-gray-400 truncate">
            {latestMessageAuthor && `${latestMessageAuthor}: `}
            {latestMessageText}
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">{unreadCount}</div>
        )}
      </a>
    </li>
  )
}

