"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import HistoryTextSelect from "@/app/components/HistoryTextSelect";
import HomeUserSelect from '@/app/components/HomeUserSelect';
import HomeUsersWall from '@/app/components/HomeUsersWall';
import Logo from "@/public/logo.png";

export default function Home() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-black">
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'mr-[25%]' : ''}`}>
              <div className="py-4 px-8 flex flex-col h-full">
      
                <div className="w-full flex flex-col items-center justify-center py-4">
      
                  <div className="flex items-center justify-center w-full mb-4 gap-6">
                  <Image
                    className="inline-block align-middle rounded-lg w-20 h-20 mr-2 gap-1"
                    src={Logo}
                    alt="placeholder"
                    width={500}
                    height={500}
                  />
                    <div className="text-4xl font-black text-orange-600">beavs.social</div>
                    
                    <div className="flex gap-4 justify-center">
                      <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("account")}>Account</button>
                      <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("chats/inbox")}>Chats</button>
                      <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("events")}>Events</button>
                      <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("description")}>App Description</button>
                    </div>
                    
                  </div>
                </div>
      
                <HomeUsersWall />
              </div>
            </div>

      <aside 
        className={`fixed top-0 right-0 z-40 h-screen transition-all duration-300 ease-in-out border-l border-l-orange-700 bg-black ${
          isSidebarOpen ? 'w-1/4' : 'w-0 border-l-0'
        }`}
        aria-label="Sidebar"
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-orange-600 text-black p-2 rounded-l-md hover:bg-orange-500 transition-colors duration-300"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        <div className={`h-full overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="h-32 px-6 pt-4 pb-32">
            <div className="py-4">
              <div className="pb-4">
                <form className="max-w-md">   
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-orange-300 sr-only dark:text-orange-100">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-orange-500 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-md text-orange-300 border border-orange-600 rounded-full bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:bg-black dark:border-orange-600 dark:placeholder-orange-400 dark:text-orange-200 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Search" required />
                  </div>
                </form>
              </div>

              <div className="text-3xl font-bold pt-4 text-orange-400">
                History
              </div>
            </div>
          </div>
          
          <div className="px-2 pt-2 overflow-y-auto">
            <ul className="font-medium">
              <HistoryTextSelect id={1} />
              <HistoryTextSelect id={2} />
              <HistoryTextSelect id={3} />
              <HistoryTextSelect id={4} />
              <HistoryTextSelect id={5} />
              <HistoryTextSelect id={6} />
              <HistoryTextSelect id={7} />
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

