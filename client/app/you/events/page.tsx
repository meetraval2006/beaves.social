"use client";

import { useState } from 'react';
import { useRouter, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HistoryTextSelect from "@/app/components/HistoryTextSelect";
import EventsWall from "@/app/components/EventsWall";
import CreateEventForm from "@/app/components/CreateEvent";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-black">
      <div className={`flex-grow transition-all duration-300`}>
        <div className="py-4 px-8 flex flex-col h-full">

          <div className="w-full flex flex-col items-center justify-center py-4">

            <div className="flex items-center justify-center w-full mb-4 gap-6">
              <button
                className="transition rounded-full ease-in-out bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 p-2 flex-initial mr-6"
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
              
              <div className="flex gap-4 justify-center">
                <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("updateAccount")}>Account</button>
                <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("chats/inbox")}>Chats</button>
                <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 flex-initial text-black" onClick={() => router.push("description")}>App Description</button>
              </div>

              
              
            </div>
          </div>

          <div className="flex justify-center my-4">
            <button
              className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 bg-orange-600 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition ease-in-out duration-300"
              onClick={() => router.push("createEvent")}
              >
                Create Event
            </button>
          </div>

          <EventsWall />
        </div>
      </div>
    </div>
  );
}


