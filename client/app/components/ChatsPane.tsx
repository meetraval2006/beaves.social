import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import ChatUserSelect from "./ChatUserSelect"

interface Chat {
  id: string
  gc_name: string
  is_gc: boolean
  users: string[]
  messages: any[]
  lastUpdated: number
}

export default function ChatsPane() {
  const [chats, setChats] = useState<Record<string, Chat>>({})
  const [userId, setUserId] = useState<string | null>(null)
  const pathname = usePathname()
  const currentChatId = pathname.split("/")[3]

  const fetchChats = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/get_gcs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) throw new Error("Failed to fetch chats")
      const data = await response.json()

      // Transform the data into a more efficient structure
      const processedChats: Record<string, Chat> = {}
      Object.entries(data).forEach(([id, chat]: [string, any]) => {
        if (chat.users?.includes(userId)) {
          processedChats[id] = {
            id,
            gc_name: chat.gc_name || "",
            is_gc: chat.is_gc,
            users: chat.users || [],
            messages: chat.messages || [],
            lastUpdated: Date.now(),
          }
        }
      })

      setChats(processedChats)
    } catch (error) {
      console.error("Failed to fetch chats:", error)
    }
  }, [userId])

  useEffect(() => {
    const storedUserId = localStorage.getItem("id")
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    if (userId) {
      fetchChats()
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchChats, 30000)
      return () => clearInterval(interval)
    }
  }, [userId, fetchChats])

  // Listen for group chat name updates
  useEffect(() => {
    const handleGcNameUpdate = (event: StorageEvent) => {
      if (event.key?.startsWith("gc_name_")) {
        const chatId = event.key.replace("gc_name_", "")
        const newName = event.newValue

        if (newName && chats[chatId]) {
          setChats((prev) => ({
            ...prev,
            [chatId]: {
              ...prev[chatId],
              gc_name: newName,
            },
          }))
        }
      }
    }

    window.addEventListener("storage", handleGcNameUpdate)
    return () => window.removeEventListener("storage", handleGcNameUpdate)
  }, [chats])

  const sortedChats = Object.values(chats).sort((a, b) => {
    const aLastMessage = a.messages[a.messages.length - 1]
    const bLastMessage = b.messages[b.messages.length - 1]
    return (bLastMessage?.timestamp || 0) - (aLastMessage?.timestamp || 0)
  })

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
              latestMessageAuthor={latestMessage?.user_id || ""}
              latestMessageText={latestMessage?.text || ""}
              isMessage={!!latestMessage}
              users={chat.users}
              isGc={chat.is_gc}
              isActive={chat.id === currentChatId}
            />
          )
        })}
      </ul>
    </div>
  )
}

