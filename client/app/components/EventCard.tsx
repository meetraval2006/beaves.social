import React, { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
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

  const majors = Array.isArray(options.majors) ? options.majors : []
  const minors = Array.isArray(options.minors) ? options.minors : []
  const years = Array.isArray(options.years) ? options.years : []
  const residence_halls = Array.isArray(options.residence_halls) ? options.residence_halls : []
  const eventDescription: string = options.eventDescription ? options.eventDescription : "<No description>"

  const majorElements: JSX.Element[] = majors.map((major) => (
    <React.Fragment key={major}>
      <span className="underline">{major}</span>&nbsp;
    </React.Fragment>
  ))
  const minorElements: JSX.Element[] = minors.map((minor) => (
    <React.Fragment key={minor}>
      <span className="underline">{minor}</span>&nbsp;
    </React.Fragment>
  ))
  const yearElements: JSX.Element[] = years.map((year) => (
    <React.Fragment key={year}>
      <span className="underline">{year}</span>&nbsp;
    </React.Fragment>
  ))
  const residenceHallElements: JSX.Element[] = residence_halls.map((residence_hall) => (
    <React.Fragment key={residence_hall}>
      <span className="underline">{residence_hall}</span>&nbsp;
    </React.Fragment>
  ))

  const eventDescriptionElement = () => (
    <React.Fragment key={eventDescription}>
      <span className="underline">{eventDescription}</span>&nbsp;
    </React.Fragment>
  )

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setIsDeleting(true)
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/delete_event?id=${options.id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          toast.success("Event deleted successfully")
          options.onDelete(options.id)
        } else {
          throw new Error("Failed to delete event")
        }
      } catch (error) {
        console.error("Error deleting event:", error)
        toast.error("Failed to delete event")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleJoin = async () => {
    if (isInGroupChat) {
      // If already in chat, just redirect
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
          toast.success("Joined event successfully")
          router.push(`/you/chats/${options.groupChatId}`)
        } else {
          throw new Error("Failed to join event")
        }
      } catch (error) {
        console.error("Error joining event:", error)
        toast.error("Failed to join event")
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

  return (
    <div
      key={options.id}
      style={{ cursor: "default" }}
      className="bg-gradient-to-r from-orange-400 to-orange-600 p-1 rounded-lg relative"
    >
      {options.userId === options.authorId && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-2 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors duration-200"
          aria-label="Delete event"
        >
          <Trash2 size={20} className="text-white" />
        </button>
      )}
      <div className="flex items-center bg-black bg-opacity-90 p-3 space-x-4 rounded-lg">
        <div className="overflow-hidden h-auto px-8 py-4 w-full">
          <div className="text-xl font-semibold text-orange-400 truncate">{options.name}</div>
          <div>
            <span className="font-bold text-slate-200"> Majors: </span>
            <span className="text-m  text-orange-400 truncate"> {majorElements} </span>
          </div>
          <div>
            <span className="font-bold text-slate-200"> Minors: </span>
            <span className="text-m text-orange-400 truncate"> {minorElements} </span>
          </div>
          <div>
            <span className="font-bold text-slate-200"> Years: </span>
            <span className="text-m text-orange-400 truncate"> {yearElements} </span>
          </div>
          <div>
            <span className="font-bold text-slate-200"> Residence Halls: </span>
            <span className="text-m text-orange-400 truncate"> {residenceHallElements} </span>
          </div>
          <div>
            <span className="font-bold text-slate-200"> Description: </span>
            <span className="text-m text-orange-400 truncate"> {eventDescriptionElement()} </span>
          </div>
          <div className="mt-4">
            <button
              onClick={handleJoin}
              disabled={isJoining}
              className="w-full transition rounded-lg ease-in-out bg-orange-500 hover:bg-orange-400 duration-100 p-2 text-slate-200 font-semibold"
            >
              {isInGroupChat ? "Go to Chat" : isJoining ? "Joining..." : "Join"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

