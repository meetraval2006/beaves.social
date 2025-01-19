"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, User, Book, Home, Mail, GraduationCap, Menu } from 'lucide-react';
import Image from 'next/image';
import HomeUserSelect from '@/app/components/HomeUserSelect';
import Logo from "@/public/logo.png";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  major: string;
  minor: string;
  year: string;
  residence_hall: string;
}

export default function HomePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/get_users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();

    const fetchCurrentUser = async () => {
      const userId = localStorage.getItem('id');
      if (userId) {
        const response = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${userId}`);
        const data = await response.json();
        setCurrentUser(data);
      } else {
        console.error('User ID not found in localStorage');
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black">
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:mr-[25%]' : ''}`}>
        <div className="py-4 px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <header className="w-full mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-lg w-16 h-16 sm:w-20 sm:h-20"
                  src={Logo || "/placeholder.svg"}
                  alt="beavs.social logo"
                  width={80}
                  height={80}
                />
                <h1 className="text-3xl sm:text-4xl font-black text-orange-600">beavs.social</h1>
              </div>
              
              <nav className="flex items-center gap-4">
                <button
                  className="lg:hidden transition rounded-lg ease-in-out bg-orange-600 hover:bg-orange-500 duration-300 p-2 text-black"
                  onClick={toggleMenu}
                >
                  <Menu size={24} />
                </button>
                <div className={`flex flex-col sm:flex-row gap-2 ${isMenuOpen ? 'flex' : 'hidden lg:flex'}`}>
                  <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 text-black text-sm sm:text-base" onClick={() => router.push("chats/inbox")}>Chats</button>
                  <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 text-black text-sm sm:text-base" onClick={() => router.push("events")}>Events</button>
                  <button className="transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 text-black text-sm sm:text-base" onClick={() => router.push("description")}>App Description</button>
                </div>
              </nav>
            </div>
          </header>

          <main className="flex-grow overflow-y-auto">
            <div key="home-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredUsers.map((user) => user.id === localStorage.getItem('id') ? <React.Fragment key="01234none"></React.Fragment> :
              (
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
              ))}
            </div>
          </main>
        </div>
      </div>

      <aside 
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-3/4 md:w-1/2 lg:w-1/4 transition-all duration-300 ease-in-out border-l border-l-orange-700 bg-black transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 left-4 bg-orange-600 text-black p-2 rounded-md hover:bg-orange-500 transition-colors duration-300"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        <div className="h-full overflow-y-auto px-6 py-8">
          <div className="mb-8">
            <form className="max-w-md mx-auto">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-orange-300 sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="search" 
                  id="default-search" 
                  className="block w-full px-4 py-2 ps-10 text-sm sm:text-md text-orange-300 border border-orange-600 rounded-full bg-gray-800 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-400">
            Your Info
          </h2>
          
          {currentUser ? (
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center text-gray-400 mb-2">
                <User size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">{currentUser.name}</span>
              </div>
              <div className="flex items-center text-gray-400 mb-2">
                <User size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">@{currentUser.username}</span>
              </div>
              <div className="flex items-center text-gray-400 mb-2">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">{currentUser.email}</span>
              </div>
              <div className="flex items-center text-gray-400 mb-2">
                <GraduationCap size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">Year: {currentUser.year}</span>
              </div>
              <div className="flex items-center text-gray-400 mb-2">
                <Book size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">Major: {currentUser.major}</span>
              </div>
              <div className="flex items-center text-gray-400 mb-2">
                <Book size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">Minor: {currentUser.minor}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Home size={16} className="mr-2 flex-shrink-0" />
                <span className="text-orange-300 text-sm sm:text-base">Residence: {currentUser.residence_hall}</span>
              </div>
            </div>
          ) : (
            <div className="text-orange-300 text-sm sm:text-base">Loading user information...</div>
          )}
          {currentUser && (
            <button
              className="w-full mt-4 transition rounded-lg ease-in-out bg-orange-600 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 p-2 text-black text-sm sm:text-base"
              onClick={() => router.push("update-account")}
            >
              Update Account
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

