"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, User, Book, Home, Mail, GraduationCap, Menu, Settings } from "lucide-react"
import Image from "next/image"
import HomeUserSelect from "@/app/components/HomeUserSelect"
import Logo from "@/public/logo.png"

interface User {
  id: string
  username: string
  name: string
  email: string
  major: string
  minor: string
  year: string
  residence_hall: string
}

export default function HomePage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/get_users")
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    }
    fetchUsers()

    const fetchCurrentUser = async () => {
      const userId = localStorage.getItem("id")
      if (userId) {
        const response = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${userId}`)
        const data = await response.json()
        setCurrentUser(data)
      } else {
        console.error("User ID not found in localStorage")
      }
    }
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    const filtered = users.filter((user) => user.username.toLowerCase().startsWith(searchTerm.toLowerCase()))
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  return (
    <div className="flex min-h-screen bg-black">
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 pl-4 sm:pl-6 lg:pl-8">
        <div className="max-w-[2000px] mx-auto pr-4 sm:pr-6 lg:pr-8 py-4">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between gap-4 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-lg w-12 h-12 sm:w-16 sm:h-16"
                  src={Logo || "/placeholder.svg"}
                  alt="beavs.social logo"
                  width={64}
                  height={64}
                />
                <h1 className="text-2xl sm:text-3xl font-black text-orange-600">beavs.social</h1>
              </div>

              <nav className="flex items-center gap-2 sm:gap-4">
                <button
                  className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 px-3 py-2 text-black text-sm sm:text-base font-medium"
                  onClick={() => router.push("chats/inbox")}
                >
                  Chats
                </button>
                <button
                  className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 px-3 py-2 text-black text-sm sm:text-base font-medium"
                  onClick={() => router.push("events")}
                >
                  Events
                </button>
                <button
                  className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 px-3 py-2 text-black text-sm sm:text-base font-medium"
                  onClick={() => router.push("description")}
                >
                  About
                </button>
              </nav>
            </div>
          </header>

          {/* Main Grid */}
          <main className="relative min-h-[calc(100vh-12rem)] max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
              {filteredUsers.map((user) =>
                user.id === localStorage.getItem("id") ? null : (
                  <HomeUserSelect
                    key={user.id}
                    username={user.username}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    major={user.major}
                    minor={user.minor}
                    year={user.year}
                    residence_hall={user.residence_hall}
                  />
                ),
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isSidebarOpen ? "right-[320px] lg:right-[384px]" : "right-0"
        }`}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="bg-orange-600 hover:bg-orange-500 text-black p-2 rounded-l-lg transition-colors">
          {isSidebarOpen ? <ChevronRight size={24} /> : <Settings size={24} />}
        </div>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-[320px] lg:w-[384px] transition-transform duration-300 ease-in-out border-l border-l-orange-700 bg-black/95 backdrop-blur-sm transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto px-6 py-8">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="search"
                className="w-full px-4 py-2 pl-10 text-sm text-orange-300 border border-orange-600 rounded-lg bg-black/50 focus:ring-orange-500 focus:border-orange-500 placeholder-orange-300/50"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-orange-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-400 border-b border-orange-600/30 pb-2">Your Profile</h2>

            {currentUser ? (
              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-orange-600/10">
                  <div className="grid gap-3">
                    <div className="flex items-center text-orange-300">
                      <User size={16} className="mr-3 text-orange-500" />
                      <span>{currentUser.name}</span>
                    </div>
                    <div className="flex items-center text-orange-300">
                      <User size={16} className="mr-3 text-orange-500" />
                      <span>@{currentUser.username}</span>
                    </div>
                    <div className="flex items-center text-orange-300">
                      <Mail size={16} className="mr-3 text-orange-500" />
                      <span>{currentUser.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-orange-600/10">
                  <div className="grid gap-3">
                    <div className="flex items-center text-orange-300">
                      <GraduationCap size={16} className="mr-3 text-orange-500" />
                      <span>Year: {currentUser.year}</span>
                    </div>
                    <div className="flex items-center text-orange-300">
                      <Book size={16} className="mr-3 text-orange-500" />
                      <span>Major: {currentUser.major}</span>
                    </div>
                    <div className="flex items-center text-orange-300">
                      <Book size={16} className="mr-3 text-orange-500" />
                      <span>Minor: {currentUser.minor}</span>
                    </div>
                    <div className="flex items-center text-orange-300">
                      <Home size={16} className="mr-3 text-orange-500" />
                      <span>Residence: {currentUser.residence_hall}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-105 hover:bg-orange-500 duration-300 p-2.5 text-black font-medium"
                  onClick={() => router.push("update-account")}
                >
                  Update Profile
                </button>
              </div>
            ) : (
              <div className="text-orange-300 animate-pulse">Loading profile...</div>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

