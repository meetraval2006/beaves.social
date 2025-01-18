"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useAppContext } from './AppContext';
import MessageCloud from './MessageCloud';

interface GCObject {
    is_gc: boolean;
    gc_name?: string;
    users?: string[];
    messages?: any[];
}

export default function ChatMessagesWindow() {
    const pathname = usePathname();
    const chatId = pathname.split("/")[3];

    const [data, setData] = useState<GCObject | null>(null);
    const [user, setUser] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [gcName, setGcName] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("id");
        setUserId(storedUserId);

        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:5000/api/get_gc?chat_id=${chatId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const fetchedData: GCObject = await response.json();
            setData(fetchedData);

            if (fetchedData.is_gc) {
                setGcName(fetchedData.gc_name || '');
            } else if (fetchedData.users && fetchedData.users.length >= 2) {
                const otherUserId = fetchedData.users[0] === storedUserId ? fetchedData.users[1] : fetchedData.users[0];
                const userResponse = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${otherUserId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const userData = await userResponse.json();
                setUser(userData);
                setGcName(userData?.username || '');
            }
        };
        
        fetchData();
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    console.log("data", data);

    const returnMessageBubbles = (data: GCObject | null) => {
        if (data == null || data.messages == null) return null;

        const sortedMessages = Object.values(data.messages).sort((a: any, b: any) => a.timestamp - b.timestamp);

        return sortedMessages.map((message: any, index: number) => (
            <MessageCloud 
                key={index}
                text={message.text}
                timestamp={message.timestamp}
                user_id={message.user_id}
                isPinned={message.isPinned}
                likes={message.likes}
                isMine={message.user_id === userId}
            />
        ));
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            const text = target.value;

            const dataObject = {
                chat_id: chatId,
                user_id: userId,
                text: text,
                likes: 0,
                isPinned: false,
                timestamp: Math.floor(Date.now() / 1000)
            };

            console.log(Math.floor(Date.now() / 1000));

            await fetch('http://127.0.0.1:5000/api/add_messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObject),
            });

            // After sending the message, fetch the updated data
            const updatedResponse = await fetch(`http://127.0.0.1:5000/api/get_gc?chat_id=${chatId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const updatedData = await updatedResponse.json();
            setData(updatedData);

            // Clear the input field
            target.value = '';
        }
    };

    return (
        <div className="sm:ml-96 flex flex-col h-screen">
            <div className="sticky top-0 z-10 border-b border-b-indigo-200 pl-6 py-4 bg-orange-700">
                <div className="flex items-center">
                    <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
                    <div className="text-xl font-semibold text-white">{gcName}</div>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                {returnMessageBubbles(data)}
                <div ref={messagesEndRef} />
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200">
                <div className="py-4">
                    <form className="max-w mx-12">   
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                onKeyDown={handleKeyDown} 
                                className="block w-full px-4 py-2 ps-4 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Message..." 
                                required 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

