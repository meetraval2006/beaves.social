"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAppContext } from './AppContext';

interface GCObject {
    is_gc: boolean;
    gc_name?: string;
    users?: any[];
    messages?: any[];
}

export default function ChatMessagesWindow() {
    const pathname = usePathname();
    const chatId = pathname.split("/")[3];

    const [data, setData] = useState<GCObject | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/get_gc?chat_id=" + chatId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setData(data);
        };
        
        fetchData();
    }, []);

    let gcName;
    const [user, setUser] = useState<any>(null);

    if (data?.is_gc)
      gcName = data.gc_name;

    else {
      const [gcNameUserId, setGcNameUserId] = useState<any>(null);

      useEffect(() => {
        const gcNameUserIdTemp = (data?.users[0] == localStorage.getItem("id")) ? data?.users[1] : data?.users[0]; 
        setGcNameUserId(gcNameUserIdTemp);

        const fetchUser = async () => {
          if (!gcNameUserId)
            return;

          const response = await fetch("http://127.0.0.1:5000/api/get_user_by_id?id=" + gcNameUserId, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const user = await response.json();          
          setUser(user);
        };
        
        fetchUser();
      }, [data, gcNameUserId]);

      gcName = user?.username;
      console.log(gcName)
    }

    return (
        <div className="sm:ml-96 flex flex-col h-screen">
      <div className="basis-1/12 border-b border-b-indigo-200 pl-6 py-4">
        <div className="flex items-center">
          <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
          <div className="text-xl font-semibold">{gcName}</div>
        </div>
      </div>

      <div className="basis-10/12 p-4 flex flex-col justify-end">
        <div className="px-2 py-1">
          <div className="float-right flex items-center columns-2">
            <div style={{cursor: "default"}} className="text-sm mr-2 text-gray-400">7:01 pm</div>
            <div className="bg-indigo-500 py-2 px-4 rounded-full">Hi</div>
          </div>
        </div>
        <div className="px-2 py-1">
          <div className="float-right flex items-center columns-2">
            <div style={{cursor: "default"}} className="text-sm mr-2 text-gray-400">7:01 pm</div>
            <div className="bg-indigo-500 py-2 px-4 rounded-full">How are you</div>
          </div>
        </div>
        <div className="px-2 py-1">
          <div className="float-right flex items-center columns-2">
            <div style={{cursor: "default"}} className="text-sm mr-2 text-gray-400">7:02 pm</div>
            <div className="bg-indigo-500 py-2 px-4 rounded-full">My name is Foo Bar</div>
          </div>
        </div>
        <div className="px-2 py-1">
          <div className="invisible">
            <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
          </div>
          <div className="float-left flex items-center columns-2">
            <div className="bg-gray-500 py-2 px-4 rounded-full">Hello!</div>
            <div style={{cursor: "default"}} className="text-sm ml-2 text-gray-400">7:02 pm</div>
          </div>
        </div>
        <div className="px-2 py-1">
          <div className="invisible">
            <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
          </div>
          <div className="float-left flex items-center columns-2">
            <div className="bg-gray-500 py-2 px-4 rounded-full">I'm doing great</div>
            <div style={{cursor: "default"}} className="text-sm ml-2 text-gray-400">7:03 pm</div>
          </div>
        </div>
        <div className="px-2 py-1">
          <div>
            <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
          </div>
          <div className="float-left flex items-center columns-2">
            <div className="bg-gray-500 py-2 px-4 rounded-full">My name is Bar Foo!</div>
            <div style={{cursor: "default"}} className="text-sm ml-2 text-gray-400">7:03 pm</div>
          </div>
        </div>
      </div>

      <div className="basis-1/12">
        <div className="py-4">
              <form className="max-w mx-12">   
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <input type="message" className="block w-full px-4 py-2 ps-4 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message..." required />
                  </div>
              </form>
          </div>
      </div>
    </div>
    )
};
            