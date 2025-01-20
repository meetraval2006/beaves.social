import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ThumbsUp, MoreVertical, Pin, Edit, Trash } from "lucide-react"

interface Message {
  id: string
  text?: string
  isPinned: boolean
  likes: number
  user_id: string
  username?: string
  timestamp: number
  isMine: boolean
  isGroupChat: boolean
}

interface MessageCloudProps {
  message: Message
  onLike: (id: string) => void
  onPin: (id: string) => void
  onEdit: (id: string, newText: string) => void
  onDelete: (id: string) => void
}

const MessageCloud: React.FC<MessageCloudProps> = ({ message, onLike, onPin, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(message.text || "")
  const optionsRef = useRef<HTMLDivElement>(null)
  const editInputRef = useRef<HTMLTextAreaElement>(null)
  const date = new Date(message.timestamp)
  const time = date.toLocaleTimeString()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    setEditedText(message.text || "")
  }, [message.text])

  const handleDoubleClick = () => {
    console.log(`Double-click like on message: ${message.id}`)
    onLike(message.id)
  }

  const handlePinClick = () => {
    console.log(`Pin/Unpin message: ${message.id}`)
    onPin(message.id)
  }

  const handleLikeClick = () => {
    console.log(`Like/Unlike message: ${message.id}`)
    onLike(message.id)
  }

  const toggleOptions = () => {
    console.log(`Toggling options for message: ${message.id}`)
    setShowOptions(!showOptions)
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setShowOptions(false)
  }

  const handleEditSubmit = () => {
    if (editedText.trim() !== message.text) {
      onEdit(message.id, editedText.trim())
    }
    setIsEditing(false)
  }

  const handleDeleteClick = () => {
    onDelete(message.id)
    setShowOptions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      setIsEditing(false)
      setEditedText(message.text || "")
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleEditSubmit()
    }
  }

  const optionsButton = (
    <button
      onClick={toggleOptions}
      className={`text-gray-500 hover:text-gray-700 ${message.isMine ? "order-last ml-2" : "order-first mr-1"}`}
    >
      <MoreVertical size={16} />
    </button>
  )

  const optionsMenu = showOptions && (
    <div
      ref={optionsRef}
      className={`absolute ${message.isMine ? "right-0" : "left-2"} top-full mt-1 bg-white rounded shadow-lg z-10`}
    >
      <button
        onClick={handlePinClick}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {message.isPinned ? "Unpin" : "Pin"}
      </button>
      <button
        onClick={handleLikeClick}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {message.likes > 0 ? "Unlike" : "Like"}
      </button>
      {message.isMine && (
        <>
          <button
            onClick={handleEditClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Delete
          </button>
        </>
      )}
    </div>
  )

  const messageContent = isEditing ? (
    <div
      className={`py-3 px-6 rounded-full ${
        message.isMine ? "bg-indigo-500 text-white" : "bg-gray-500 text-white"
      } relative`}
    >
      <textarea
        ref={editInputRef}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent resize-none outline-none"
        rows={1}
        maxLength={200}
      />
      <button onClick={handleEditSubmit} className="absolute right-4 bottom-3 text-white hover:text-gray-200">
        <Edit size={16} />
      </button>
    </div>
  ) : (
    <div
      className={`py-3 px-6 rounded-full ${
        message.isMine ? "bg-indigo-500 text-white" : "bg-gray-500 text-white"
      } relative max-w-[35vw] whitespace-pre-wrap break-words`}
      onDoubleClick={handleDoubleClick}
    >
      {message.text}
      {message.likes > 0 && (
        <span className="ml-2 text-sm flex items-center">
          <ThumbsUp size={12} /> {message.likes}
        </span>
      )}
    </div>
  )

  if (message.isMine) {
    return (
      <div className="px-2 py-1">
        <div className="float-right flex items-center columns-2">
          <div style={{ cursor: "default" }} className="text-sm mr-2 text-gray-400">
            {time}
          </div>
          <div className="flex items-center relative">
            {messageContent}
            {optionsButton}
            {optionsMenu}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="px-2 py-1">
        <div>
          <img
            src="https://i.pinimg.com/736x/71/39/e2/7139e287d3f84a3691a38ecb048aa9f7.jpg"
            className="flex items-center float-left h-11 w-11 mr-2 ms-2 rounded-full"
            alt="user-avatar"
          />
        </div>
        <div className="float-left flex flex-col">
          <div className="flex items-center columns-2 relative">
            {optionsButton}
            {messageContent}
            <div style={{ cursor: "default" }} className="text-sm ml-2 text-gray-400">
              {time}
            </div>
            {optionsMenu}
          </div>
          {message.isGroupChat && !message.isMine && (
            <div className="text-xs text-gray-500 mt-1 ml-6">{message.username}</div>
          )}
        </div>
      </div>
    )
  }
}

export default MessageCloud

