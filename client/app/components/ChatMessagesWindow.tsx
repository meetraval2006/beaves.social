"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, Users, Pin } from "lucide-react"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"

import { useAppContext } from "./AppContext"
import MessageCloud from "./MessageCloud"
import UserListPopup from "./UserListPopup"
import PinnedMessagesPopup from "./PinnedMessagesPopup"

interface GCObject {
  is_gc: boolean
  gc_name?: string
  users?: string[]
  messages?: { [key: string]: any } | any[]
}

export default function ChatMessagesWindow() {
  const router = useRouter()
  const pathname = usePathname()
  const chatId = pathname.split("/")[3]

  const [data, setData] = useState<GCObject | null>(null)
  const [user, setUser] = useState<any>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [gcName, setGcName] = useState<string>("")
  const [showUserList, setShowUserList] = useState(false)
  const [showPinnedMessages, setShowPinnedMessages] = useState(false)
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add handlers for Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowUserList(false)
        setShowPinnedMessages(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchData = useCallback(async () => {
    try {
      console.log(`Fetching data for chat: ${chatId}`)
      const response = await fetch(`http://127.0.0.1:5000/api/get_gc?chat_id=${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        console.error(`Server responded with an error: ${response.status}`)
        throw new Error("Failed to fetch chat data")
      }
      const fetchedData: GCObject = await response.json()
      console.log("Fetched chat data:", fetchedData)
      setData(fetchedData)

      if (fetchedData.is_gc) {
        setGcName(fetchedData.gc_name || "")
      } else if (fetchedData.users && fetchedData.users.length >= 2) {
        const otherUserId = fetchedData.users[0] === userId ? fetchedData.users[1] : fetchedData.users[0]
        console.log(`Fetching user data for: ${otherUserId}`)
        const userResponse = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${otherUserId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!userResponse.ok) {
          console.error(`Server responded with an error: ${userResponse.status}`)
          throw new Error("Failed to fetch user data")
        }
        const userData = await userResponse.json()
        console.log("Fetched user data:", userData)
        setUser(userData)
        setGcName(userData?.username || "")
      }
    } catch (error) {
      console.error("Error fetching chat data:", error)
      toast.error("Failed to load chat data. Please try again.")
    }
  }, [chatId, userId])

  useEffect(() => {
    const storedUserId = localStorage.getItem("id")
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    if (userId) {
      fetchData()
    }
  }, [userId, fetchData])

  useEffect(() => {
    scrollToBottom()
  }, [data])

  const handleLike = async (messageId: string) => {
    try {
      console.log(`Attempting to like message: ${messageId}`)
      const response = await fetch(`http://127.0.0.1:5000/api/like_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: chatId, message_id: messageId, user_id: userId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`Server responded with an error: ${response.status}`, errorData)
        throw new Error(errorData.error || "Failed to like message")
      }

      const result = await response.json()
      console.log("Like operation successful:", result)

      await fetchData()
    } catch (error) {
      console.error("Error liking message:", error)
      toast.error("Failed to like message. Please try again.")
    }
  }

  const handlePin = async (messageId: string) => {
    try {
      console.log(`Attempting to pin message: ${messageId}`)
      const messagesArray = Array.isArray(data?.messages) ? data?.messages : Object.values(data?.messages || {})
      const pinnedMessages = messagesArray.filter((m) => m.isPinned)

      if (pinnedMessages.length >= 50) {
        console.warn("Maximum number of pinned messages reached")
        toast.error("Maximum number of pinned messages reached. Please unpin a message first.")
        return
      }

      const response = await fetch(`http://127.0.0.1:5000/api/pin_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: chatId, message_id: messageId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`Server responded with an error: ${response.status}`, errorData)
        throw new Error(errorData.error || "Failed to pin message")
      }

      const result = await response.json()
      console.log("Pin operation successful:", result)

      await fetchData()
    } catch (error) {
      console.error("Error pinning message:", error)
      toast.error("Failed to pin message. Please try again.")
    }
  }

  const returnMessageBubbles = (data: GCObject | null) => {
    if (data == null || data.messages == null) {
      console.log("No data or messages available")
      return null
    }

    let messagesArray: any[]
    if (Array.isArray(data.messages)) {
      messagesArray = data.messages
    } else if (typeof data.messages === "object") {
      messagesArray = Object.entries(data.messages).map(([key, value]) => ({ id: key, ...value }))
    } else {
      console.error("Unexpected messages format:", data.messages)
      return null
    }

    const sortedMessages = messagesArray.sort((a: any, b: any) => a.timestamp - b.timestamp)

    console.log("Sorted messages:", sortedMessages)

    return sortedMessages.map((message: any, index: number) => {
      return (
        <MessageCloud
          key={index}
          message={{
            id: message.id,
            text: message.text,
            timestamp: message.timestamp,
            user_id: message.user_id,
            username: message.username,
            isPinned: message.isPinned,
            likes: message.likes,
            isMine: message.user_id === userId,
            isGroupChat: data.is_gc,
          }}
          onLike={handleLike}
          onPin={handlePin}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
        />
      )
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim() !== "") {
      if (inputText.length > 200) {
        toast.error("Message cannot exceed 200 characters")
        return
      }
      try {
        let username = ""

        // Fetch username using userId
        if (userId) {
          const userResponse = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()
            username = userData.username || "" // Use the username if available
          } else {
            console.error(`Failed to fetch username for userId: ${userId}`)
          }
        }

        console.log(username, "username")

        const dataObject = {
          id: `${Date.now()}-${userId}`,
          chat_id: chatId,
          user_id: userId,
          text: inputText.trim(),
          likes: 0,
          username,
          isPinned: false,
          timestamp: Date.now(),
        }

        const response = await fetch("http://127.0.0.1:5000/api/add_messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObject),
        })

        if (!response.ok) {
          throw new Error("Failed to send message")
        }

        setInputText("")
        await fetchData()
      } catch (error) {
        console.error("Error sending message:", error)
        toast.error("Failed to send message. Please try again.")
      }
    }
  }

  const handleUserListUpdate = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  const handleEditMessage = async (messageId: string, newText: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/edit_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          new_text: newText,
          is_latest: data?.messages && isLatestMessage(messageId, data.messages),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to edit message")
      }

      await fetchData()
    } catch (error) {
      console.error("Error editing message:", error)
      toast.error("Failed to edit message. Please try again.")
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const isLatest = data?.messages && isLatestMessage(messageId, data.messages)
      const response = await fetch(`http://127.0.0.1:5000/api/delete_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          is_latest: isLatest,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }

      await fetchData()
    } catch (error) {
      console.error("Error deleting message:", error)
      toast.error("Failed to delete message. Please try again.")
    }
  }

  const isLatestMessage = (messageId: string, messages: any) => {
    const messagesArray = Array.isArray(messages) ? messages : Object.values(messages)
    const sortedMessages = messagesArray.sort((a: any, b: any) => b.timestamp - a.timestamp)
    return sortedMessages[0]?.id === messageId
  }

  const handleLeaveGroup = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/leave_group_chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: chatId, user_id: userId }),
      })

      if (!response.ok) {
        throw new Error("Failed to leave group chat")
      }

      toast.success("You have left the group chat")
      router.push("/you/chats/inbox")
    } catch (error) {
      console.error("Error leaving group chat:", error)
    }
  }

  return (
    <div className="sm:ml-96 flex flex-col h-screen">
      <div className="sticky top-0 z-10 border-b border-b-orange-600 pl-6 py-4 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="transition rounded-full ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-700 duration-300 p-2 flex-initial mr-6"
              onClick={() => router.push("/you/chats/inbox")}
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            <div className="text-xl font-semibold text-white">{gcName}</div>
          </div>
          <div className="flex items-center">
            <button onClick={() => setShowPinnedMessages(true)} className="mr-4">
              <Pin className="text-white" size={24} />
            </button>
            {data && data.is_gc && (
              <>
                <Button
                  onClick={() => setShowUserList(true)}
                  variant="ghost"
                  className="mr-4 text-white hover:text-white"
                >
                  <Users className="mr-2" size={24} />
                  Users
                </Button>
                <Button
                  onClick={handleLeaveGroup}
                  variant="destructive"
                  className="mr-4 bg-red-600 hover:bg-red-700 text-white"
                >
                  Leave Group
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col bg-gray-900">
        {returnMessageBubbles(data)}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700">
        <div className="py-4">
          <form className="max-w mx-12 relative" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={200}
                className="block w-full px-4 py-2 ps-4 text-md text-white border border-gray-600 rounded-full bg-gray-700 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Message..."
                required
              />
              <div className="absolute right-4 -top-6 text-sm text-gray-400">{inputText.length}/200</div>
            </div>
          </form>
        </div>
      </div>

      {showUserList && data && data.is_gc && (
        <UserListPopup
          chatId={chatId}
          users={data.users || []}
          onClose={() => setShowUserList(false)}
          currentUserId={userId || ""}
          onUpdate={handleUserListUpdate}
        />
      )}

      {showPinnedMessages && data && (
        <PinnedMessagesPopup
          messages={
            Array.isArray(data.messages)
              ? data.messages.filter((m) => m.isPinned)
              : Object.values(data.messages).filter((m) => m.isPinned)
          }
          onClose={() => setShowPinnedMessages(false)}
          isGroupChat={data.is_gc}
        />
      )}
    </div>
  )
}

