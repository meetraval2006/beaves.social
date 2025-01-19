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
}

export default function ChatUserSelect(options: Options) {
  const router = useRouter()
  const { latestMessageAuthor, latestMessageText, unreadCount } = options
  const [displayName, setDisplayName] = useState(options.isGc ? options.username : "")
  const handleUserClick = (_: any, id: string): void => router.push(`/you/chats/${id}`)

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
    <li>
      <a
        style={{ cursor: "pointer" }}
        onClick={(e) => handleUserClick(e, options.id)}
        className={`flex items-center p-2 h-16 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${options.isActive ? "bg-gray-100 dark:bg-gray-700" : ""}`}
      >
        <img
          src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg"
          className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full"
          alt="server-icon"
        />
        <div className="flex-grow">
          <div className="text-base">
            <span className="text-orange-400">{displayName}</span>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-white">
              {latestMessageAuthor}
              {options.isMessage ? ": " : ""}
              {latestMessageText}
            </span>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">{unreadCount}</div>
        )}
      </a>
    </li>
  )
}

