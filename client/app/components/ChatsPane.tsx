import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import ChatUserSelect from "./ChatUserSelect"
import { useWebSocket } from "./WebSocketContext"

interface Chat {
  id: string
  gc_name: string
  is_gc: boolean
  users: string[]
  messages: any[]
  lastUpdated: number
  unreadCount: number
}

export default function ChatsPane() {
  const [chats, setChats] = useState<Record<string, Chat>>({})
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const currentChatId = pathname.split("/")[3]
  const { socket } = useWebSocket()

  const fetchChats = useCallback(async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch("http://127.0.0.1:5000/api/get_gcs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) throw new Error("Failed to fetch chats")
      const data = await response.json()

      const processedChats: Record<string, Chat> = {}
      if (data && typeof data === "object") {
        Object.entries(data).forEach(([id, chat]: [string, any]) => {
          if (chat && chat.users?.includes(userId)) {
            const messages = Array.isArray(chat.messages) ? chat.messages : Object.values(chat.messages || {})
            processedChats[id] = {
              id,
              gc_name: chat.gc_name || "",
              is_gc: chat.is_gc,
              users: chat.users || [],
              messages: messages,
              lastUpdated: chat.lastUpdated || Date.now(),
              unreadCount: chat.unreadCount || 0,
            }
          }
        })
      }
      setChats(processedChats)
    } catch (error) {
      console.error("Failed to fetch chats:", error)
      setError("Failed to load chats. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    const storedUserId = localStorage.getItem("id")
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    if (userId) {
      fetchChats()
    }
  }, [userId, fetchChats])

  useEffect(() => {
    if (socket && userId) {
      const handleNewMessage = (data: { chat_id: string; message: any }) => {
        setChats((prevChats) => {
          const updatedChats = { ...prevChats }
          if (updatedChats[data.chat_id]) {
            const messageExists = updatedChats[data.chat_id].messages.some((m) => m.id === data.message.id)

            if (!messageExists) {
              updatedChats[data.chat_id].messages.push(data.message)
              updatedChats[data.chat_id].lastUpdated = Date.now()

              // Only increment unread count if:
              // 1. The message is not from the current user
              // 2. The chat is not currently focused
              // 3. It's not a DM or if it is a DM, check if the sender is not the current user
              if (
                data.message.user_id !== userId &&
                data.chat_id !== currentChatId &&
                (updatedChats[data.chat_id].is_gc ||
                  (!updatedChats[data.chat_id].is_gc && data.message.user_id !== userId))
              ) {
                updatedChats[data.chat_id].unreadCount++
              }
            }
          }
          return updatedChats
        })
      }

      const handleMessageEdit = (data: {
        chat_id: string
        message_id: string
        new_text: string
        is_latest: boolean
      }) => {
        if (data.is_latest) {
          setChats((prevChats) => {
            const updatedChats = { ...prevChats }
            if (updatedChats[data.chat_id]) {
              const messages = updatedChats[data.chat_id].messages
              const messageIndex = messages.findIndex((m) => m.id === data.message_id)
              if (messageIndex !== -1) {
                messages[messageIndex] = { ...messages[messageIndex], text: data.new_text }
              }
            }
            return updatedChats
          })
        }
      }

      const handleMessageDelete = (data: { chat_id: string; message_id: string; is_latest: boolean }) => {
        if (data.is_latest) {
          setChats((prevChats) => {
            const updatedChats = { ...prevChats }
            if (updatedChats[data.chat_id]) {
              const messages = updatedChats[data.chat_id].messages
              const filteredMessages = messages.filter((m) => m.id !== data.message_id)
              updatedChats[data.chat_id].messages = filteredMessages
            }
            return updatedChats
          })
        }
      }

      const handleUnreadCountUpdate = (data: { chat_id: string; unread_count: number }) => {
        setChats((prevChats) => {
          const updatedChats = { ...prevChats }
          if (updatedChats[data.chat_id]) {
            updatedChats[data.chat_id].unreadCount = data.unread_count
          }
          return updatedChats
        })
      }

      const handleUserLeaveChat = (data: { chat_id: string; user_id: string }) => {
        if (data.user_id === userId) {
          setChats((prevChats) => {
            const updatedChats = { ...prevChats }
            delete updatedChats[data.chat_id]
            return updatedChats
          })
        }
      }

      socket.on("new_message", handleNewMessage)
      socket.on("message_edit", handleMessageEdit)
      socket.on("message_delete", handleMessageDelete)
      socket.on("unread_count_update", handleUnreadCountUpdate)
      socket.on("user_leave_chat", handleUserLeaveChat)

      return () => {
        socket.off("new_message", handleNewMessage)
        socket.off("message_edit", handleMessageEdit)
        socket.off("message_delete", handleMessageDelete)
        socket.off("unread_count_update", handleUnreadCountUpdate)
        socket.off("user_leave_chat", handleUserLeaveChat)
      }
    }
  }, [socket, userId])

  const handleClearUnread = useCallback(
    async (chatId: string) => {
      if (userId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/api/mark_messages_read`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ chat_id: chatId, user_id: userId }),
          })
          if (!response.ok) {
            throw new Error("Failed to mark messages as read")
          }
          // Update local state immediately
          setChats((prev) => ({
            ...prev,
            [chatId]: {
              ...prev[chatId],
              unreadCount: 0,
            },
          }))
          // The server will emit an 'unread_count_update' event to all clients
        } catch (error) {
          console.error("Error clearing unread messages:", error)
        }
      }
    },
    [userId],
  )

  const sortedChats = Object.values(chats).sort((a, b) => b.lastUpdated - a.lastUpdated)

  if (loading) {
    return <div className="p-4">Loading chats...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  if (sortedChats.length === 0) {
    return <div className="p-4">No chats available. Start a new conversation!</div>
  }

  return (
    <div className="px-2 pb-4 pt-2 overflow-y-auto">
      <ul className="font-medium">
        {sortedChats.map((chat) => {
          const latestMessage = chat.messages[chat.messages.length - 1]
          return (
            <ChatUserSelect
              key={chat.id}
              id={chat.id}
              username={chat.gc_name}
              latestMessageAuthor={latestMessage?.username || ""}
              latestMessageText={latestMessage?.text || ""}
              isMessage={!!latestMessage}
              users={chat.users}
              isGc={chat.is_gc}
              isActive={chat.id === currentChatId}
              unreadCount={chat.unreadCount}
              onClearUnread={handleClearUnread}
            />
          )
        })}
      </ul>
    </div>
  )
}

