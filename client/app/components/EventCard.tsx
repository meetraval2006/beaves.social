import React, { useState, useEffect, useRef } from "react"
import { Trash2, ChevronDown, ChevronUp, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

interface Options {
  userId: string
  authorId: string
  name: string
  majors: string[]
  minors: string[]
  years: string[]
  residence_halls: string[]
  eventDescription: string
  key: string
  id: string
  groupChatId: string
  onDelete: (id: string) => void
}

export default function EventCard(options: Options) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [isInGroupChat, setIsInGroupChat] = useState(false)
  const [userCount, setUserCount] = useState(0)

  const majors = Array.isArray(options.majors) ? options.majors : []
  const minors = Array.isArray(options.minors) ? options.minors : []
  const years = Array.isArray(options.years) ? options.years : []
  const residence_halls = Array.isArray(options.residence_halls) ? options.residence_halls : []
  const eventDescription: string = options.eventDescription ? options.eventDescription : "<No description>"

  const renderSection = (title: string, items: string[]) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [showMoreButton, setShowMoreButton] = useState(false)

    useEffect(() => {
      if (containerRef.current) {
        const hasOverflow = containerRef.current.scrollHeight > containerRef.current.clientHeight
        setShowMoreButton(hasOverflow)
      }
    }, [items])

    return (
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200">{title}:</span>
          {showMoreButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-400 hover:text-orange-300 focus:outline-none transition-colors duration-200"
              aria-label={isExpanded ? `Show less ${title}` : `Show more ${title}`}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
        <div className="relative mt-1">
          <div
            ref={containerRef}
            className={`flex flex-wrap transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-none" : "max-h-8 overflow-hidden"
            }`}
          >
            {items.map((item, index) => (
              <span key={index} className="inline-block bg-orange-500 text-white rounded px-2 py-1 text-sm mr-1 mb-1">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderDescription = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const shortDescription = eventDescription.slice(0, 100)
    const hasMore = eventDescription.length > 100

    return (
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200">Description:</span>
          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-400 hover:text-orange-300 focus:outline-none transition-colors duration-200"
              aria-label={isExpanded ? "Show less description" : "Show full description"}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
        <div
          className={`mt-1 text-orange-400 transition-all duration-300 ease-in-out ${isExpanded ? "" : "max-h-24 overflow-y-auto"}`}
        >
          {isExpanded ? eventDescription : shortDescription}
          {!isExpanded && hasMore && "..."}
        </div>
      </div>
    )
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this net?")) {
      setIsDeleting(true)
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/delete_event?id=${options.id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          toast.success("Net deleted successfully")
          options.onDelete(options.id)
        } else {
          throw new Error("Failed to delete net")
        }
      } catch (error) {
        console.error("Error deleting event:", error)
        toast.error("Failed to delete net")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleJoin = async () => {
    if (isInGroupChat) {
      router.push(`/you/chats/${options.groupChatId}`)
    } else {
      setIsJoining(true)
      try {
        const response = await fetch("http://127.0.0.1:5000/api/join_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: options.id,
            userId: options.userId,
            groupChatId: options.groupChatId,
          }),
        })
        if (response.ok) {
          toast.success("You were reeled into the net")
          router.push(`/you/chats/${options.groupChatId}`)
        } else {
          throw new Error("Failed to join event")
        }
      } catch (error) {
        console.error("Error joining event:", error)
        toast.error("Failed to join net")
      } finally {
        setIsJoining(false)
      }
    }
  }

  useEffect(() => {
    const checkGroupChatMembership = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get_gc?chat_id=${options.groupChatId}`)
        if (response.ok) {
          const data = await response.json()
          setIsInGroupChat(data.users?.includes(options.userId) || false)
        }
      } catch (error) {
        console.error("Error checking group chat membership:", error)
      }
    }

    checkGroupChatMembership()
  }, [options.groupChatId, options.userId])

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get_gc?chat_id=${options.groupChatId}`)
        if (response.ok) {
          const data = await response.json()
          setUserCount(data.users?.length || 0)
        }
      } catch (error) {
        console.error("Error fetching user count:", error)
      }
    }

    fetchUserCount()
  }, [options.groupChatId])

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-1 rounded-lg h-full">
      <div className="bg-black bg-opacity-90 p-4 rounded-lg h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-orange-400">{options.name}</h2>
          {options.userId === options.authorId && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors duration-200"
              aria-label="Delete net"
            >
              <Trash2 size={16} className="text-white" />
            </button>
          )}
        </div>

        <div className="flex-grow overflow-y-auto mb-4">
          {renderSection("Majors", majors)}
          {renderSection("Minors", minors)}
          {renderSection("Years", years)}
          {renderSection("Residence Halls", residence_halls)}
          {renderDescription()}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2 group">
            <div className="flex items-center">
              <Users size={24} className="text-orange-400 mr-2" />
              <span className="text-lg font-bold text-slate-200">Users in Net:</span>
            </div>
            <span className="text-orange-400 font-bold text-2xl transition-all duration-300 ease-in-out group-hover:text-orange-300">
              {userCount}
            </span>
          </div>
          <button
            onClick={handleJoin}
            disabled={isJoining}
            className="w-full transition rounded-lg ease-in-out bg-orange-500 hover:bg-orange-400 duration-100 p-2 text-slate-200 font-semibold"
          >
            {isInGroupChat ? "Go to Chat" : isJoining ? "Reeling in..." : "Reel in"}
          </button>
        </div>
      </div>
    </div>
  )
}

