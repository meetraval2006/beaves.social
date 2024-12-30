"use client";

import { useState } from 'react';
import { useRouter, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from 'lucide-react';

import HistoryTextSelect from "@/app/components/HistoryTextSelect";
import EventsWall from "@/app/components/EventsWall";

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
            <div className="flex items-center justify-center w-full mb-4">
              <button
                className="transition rounded-full ease-in-out bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 p-2 flex-initial mr-4"
                onClick={() => redirect("/you/home")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                  viewBox="0 0 576 512"
                  fill="white"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
              </button>
              <div className="text-4xl font-black text-orange-800">Events</div>
            </div>
            <div className="flex gap-4 justify-center">
              <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("account")}>Account</button>
              <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("chats/inbox")}>Chats</button>
              <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("description")}>App Description</button>
            </div>
          </div>

          <EventsWall />
        </div>
      </div>

      <aside 
        className={`fixed top-0 right-0 z-40 h-screen transition-all duration-300 ease-in-out border-l border-l-orange-200 bg-black ${
          isSidebarOpen ? 'w-1/4' : 'w-0 border-l-0'
        }`}
        aria-label="Sidebar"
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-l-md hover:bg-orange-600 transition-colors duration-300"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        <div className={`h-full overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="h-32 px-6 pt-4 pb-32">
            <div className="py-4">
              <div className="pb-4">
                <form className="max-w-md">
                  <label className="mb-2 text-sm font-medium text-orange-300 sr-only dark:text-orange-100">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-orange-500 dark:text-orange-400"
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
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full px-4 py-2 ps-10 text-md text-orange-300 border border-orange-600 rounded-full bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:bg-black dark:border-orange-600 dark:placeholder-orange-400 dark:text-orange-200 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                      placeholder="Search"
                      required
                    />
                  </div>
                </form>
              </div>

              <div className="text-3xl font-bold pt-4 text-orange-400">History</div>
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


