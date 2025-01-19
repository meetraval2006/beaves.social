"use client";

import { useState } from 'react';
import { useRouter, redirect } from "next/navigation";
import { ChevronLeft, Menu } from 'lucide-react';
import EventsWall from "@/app/components/EventsWall";

export default function Events() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <button
              className="mr-4 transition rounded-full bg-orange-600 hover:bg-orange-700 p-2"
              onClick={() => redirect("/you/home")}
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-black text-orange-600">Events</h1>
          </div>
          
          <nav className="flex items-center">
            <button
              className="sm:hidden transition rounded-lg bg-orange-600 hover:bg-orange-700 p-2 mr-2"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </button>
            <div className={`flex flex-col sm:flex-row gap-2 ${isMenuOpen ? 'flex' : 'hidden sm:flex'}`}>
              <button className="transition rounded-lg bg-orange-600 hover:bg-orange-700 p-2 text-white text-sm sm:text-base" onClick={() => router.push("chats/inbox")}>Chats</button>
              <button className="transition rounded-lg bg-orange-600 hover:bg-orange-700 p-2 text-white text-sm sm:text-base" onClick={() => router.push("description")}>App Description</button>
            </div>
          </nav>
        </div>
      </header>

      <main className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center my-4">
          <button
            className="transition rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 shadow-md"
            onClick={() => router.push("create-event")}
          >
            Create Event
          </button>
        </div>

        <EventsWall userId={localStorage.getItem("id") ?? "null"} />
      </main>
    </div>
  );
}

