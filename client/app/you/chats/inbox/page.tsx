'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ChatsPane from "@/app/components/ChatsPane"
import { redirect } from 'next/navigation'
import ChatCreationPopup from '@/app/components/CreateChatPane'

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  

  return (
    <div className="flex h-screen bg-black">
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out border-r border-r-orange-200 bg-black ${
          isSidebarOpen ? 'w-96 translate-x-0' : 'w-0 -translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-600 transition-colors duration-300"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        <div className={`h-full overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="h-32 px-2 py-4 pb-32">
            <div className="p-4 py-4">
              <div className="flex gap-4">
                <button 
                  className="transition rounded-full ease-in-out bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 p-2 flex-initial" 
                  onClick={() => redirect("/you/home")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 576 512" fill="white">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                  </svg>
                </button>

                <div className="text-2xl font-bold text-orange-300">
                  Your Chats
                </div>
              </div>

              <div className="pb-4 pt-6">
                <form className="max-w-md mx-auto">   
                  <label className="mb-2 text-sm font-medium text-orange-300 sr-only dark:text-orange-100">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-orange-500 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                    </div>
                    <input 
                      type="search" 
                      id="default-search" 
                      className="block w-full px-4 py-2 ps-10 text-md text-orange-300 border border-orange-300 rounded-full bg-black focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-900 dark:border-orange-600 dark:placeholder-orange-400 dark:text-orange-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" 
                      placeholder="Search" 
                      required 
                    />
                  </div>
                </form>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-orange-400">Chats</div>
                <button 
                  className="text-sm font-semibold text-orange-500 hover:text-orange-400"
                  onClick={() => setIsPopupOpen(true)}
                >
                  New Chat
                </button>
              </div>
            </div>
            <ChatsPane />
          </div>
        </div>
      </aside>

      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-96' : 'ml-0'
        }`}
      >
        <div className="flex h-screen bg-black p-4">
          <div className="text-center m-auto">
            <div>
              <span className="inline-flex items-center justify-center w-[72px] h-[72px] bg-orange-600 rounded-full mb-4">
                <svg className="w-9 h-9 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                  <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                  <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                </svg>
                <span className="sr-only">Message icon</span>
              </span>
            </div>
            <div className="text-2xl font-bold mb-1 text-orange-800">Your messages</div>
            <div className="text-lg text-orange-700">Tap on a chat to continue conversing.</div>
          </div>
        </div>
      </div>

      <ChatCreationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  )
}

