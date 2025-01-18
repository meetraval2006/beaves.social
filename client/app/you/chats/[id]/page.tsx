"use client";

import { useState } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { Plus } from 'lucide-react';

import ChatsPane from "@/app/components/ChatsPane";
import ChatMessagesWindow from "@/app/components/ChatMessagesWindow";
import CreateChatModal from "@/app/components/CreateChatModal";

export default function Home() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <a data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="a" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-orange-500 rounded-lg sm:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </a>

      <aside id="default-sidebar" className="fixed rows-2 border-r border-r-orange-200 top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-black" aria-label="Sidebar">
        <div className="h-32 px-2 py-4 pb-32">
          <div className="p-4 py-4">
            <div className="flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <button className="transition rounded-full ease-in-out bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 p-2 flex-initial" onClick={() => redirect("/you/home")}>
                  <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 576 512" fill="white">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                  </svg>
                </button>
                <div className="text-2xl font-bold text-orange-300">
                  Your Chats
                </div>
              </div>
              <div className="relative">
                <button
                  className="transition rounded-full ease-in-out bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 p-2"
                  onClick={() => setIsDropdownOpen(true)}
                >
                  <Plus className="text-white" size={20} />
                </button>
                {isDropdownOpen && <CreateChatModal onClose={() => setIsDropdownOpen(false)} />}
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
                  <input type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-md text-orange-300 border border-orange-300 rounded-full bg-black focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-900 dark:border-orange-600 dark:placeholder-orange-400 dark:text-orange-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Search" required />
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <ChatsPane/>
      </aside>

      <ChatMessagesWindow/>
    </>
  );
}

