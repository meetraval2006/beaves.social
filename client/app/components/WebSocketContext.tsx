"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import io, { type Socket } from "socket.io-client"

interface WebSocketContextType {
  socket: Socket | null
}

const WebSocketContext = createContext<WebSocketContextType>({ socket: null })

export const useWebSocket = () => useContext(WebSocketContext)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Only create socket on client side
    if (typeof window !== "undefined") {
      const newSocket = io("http://localhost:5000", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Number.POSITIVE_INFINITY,
      })
      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }
  }, [])

  return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>
}

