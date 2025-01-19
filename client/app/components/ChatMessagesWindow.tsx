"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Users, Pin } from 'lucide-react';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { useAppContext } from './AppContext';
import MessageCloud from './MessageCloud';
import UserListPopup from './UserListPopup';
import PinnedMessagesPopup from './PinnedMessagesPopup';

interface GCObject {
    is_gc: boolean;
    gc_name?: string;
    users?: string[];
    messages?: { [key: string]: any } | any[];
}

export default function ChatMessagesWindow() {
    const pathname = usePathname();
    const chatId = pathname.split("/")[3];

    const [data, setData] = useState<GCObject | null>(null);
    const [user, setUser] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [gcName, setGcName] = useState<string>('');
    const [showUserList, setShowUserList] = useState(false);
    const [showPinnedMessages, setShowPinnedMessages] = useState(false);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchData = useCallback(async () => {
        try {
            console.log(`Fetching data for chat: ${chatId}`);
            const response = await fetch(`http://127.0.0.1:5000/api/get_gc?chat_id=${chatId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.error(`Server responded with an error: ${response.status}`);
                throw new Error('Failed to fetch chat data');
            }
            const fetchedData: GCObject = await response.json();
            console.log('Fetched chat data:', fetchedData);
            setData(fetchedData);

            if (fetchedData.is_gc) {
                setGcName(fetchedData.gc_name || '');
            } else if (fetchedData.users && fetchedData.users.length >= 2) {
                const otherUserId = fetchedData.users[0] === userId ? fetchedData.users[1] : fetchedData.users[0];
                console.log(`Fetching user data for: ${otherUserId}`);
                const userResponse = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${otherUserId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!userResponse.ok) {
                    console.error(`Server responded with an error: ${userResponse.status}`);
                    throw new Error('Failed to fetch user data');
                }
                const userData = await userResponse.json();
                console.log('Fetched user data:', userData);
                setUser(userData);
                setGcName(userData?.username || '');
            }
        } catch (error) {
            console.error('Error fetching chat data:', error);
            toast.error('Failed to load chat data. Please try again.');
        }
    }, [chatId, userId]);

    useEffect(() => {
        const storedUserId = localStorage.getItem("id");
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId, fetchData]);

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const handleLike = async (messageId: string) => {
        try {
            console.log(`Attempting to like message: ${messageId}`);
            const response = await fetch(`http://127.0.0.1:5000/api/like_message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: chatId, message_id: messageId, user_id: userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Server responded with an error: ${response.status}`, errorData);
                throw new Error(errorData.error || 'Failed to like message');
            }

            const result = await response.json();
            console.log('Like operation successful:', result);

            await fetchData();
        } catch (error) {
            console.error('Error liking message:', error);
            toast.error('Failed to like message. Please try again.');
        }
    };

    const handlePin = async (messageId: string) => {
        try {
            console.log(`Attempting to pin message: ${messageId}`);
            const messagesArray = Array.isArray(data?.messages) 
                ? data?.messages 
                : Object.values(data?.messages || {});
            const pinnedMessages = messagesArray.filter(m => m.isPinned);
            
            if (pinnedMessages.length >= 50) {
                console.warn('Maximum number of pinned messages reached');
                toast.error('Maximum number of pinned messages reached. Please unpin a message first.');
                return;
            }

            const response = await fetch(`http://127.0.0.1:5000/api/pin_message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: chatId, message_id: messageId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Server responded with an error: ${response.status}`, errorData);
                throw new Error(errorData.error || 'Failed to pin message');
            }

            const result = await response.json();
            console.log('Pin operation successful:', result);

            await fetchData();
        } catch (error) {
            console.error('Error pinning message:', error);
            toast.error('Failed to pin message. Please try again.');
        }
    };

    const returnMessageBubbles = (data: GCObject | null) => {
        if (data == null || data.messages == null) {
            console.log("No data or messages available");
            return null;
        }

        let messagesArray: any[];
        if (Array.isArray(data.messages)) {
            messagesArray = data.messages;
        } else if (typeof data.messages === 'object') {
            messagesArray = Object.values(data.messages);
        } else {
            console.error("Unexpected messages format:", data.messages);
            return null;
        }

        const sortedMessages = messagesArray.sort((a: any, b: any) => a.timestamp - b.timestamp);

        return sortedMessages.map((message: any, index: number) => {
            console.log("Rendering message:", message);
            return (
                <MessageCloud 
                    key={index}
                    message={{
                        id: message.id,
                        text: message.text,
                        timestamp: message.timestamp,
                        user_id: message.user_id,
                        username: message.username,
                        isPinned: message.isPinned,
                        likes: message.likes,
                        isMine: message.user_id === userId,
                        isGroupChat: data.is_gc
                    }}
                    onLike={handleLike}
                    onPin={handlePin}
                />
            );
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputText.trim() !== '') {
            try {
                const dataObject = {
                    chat_id: chatId,
                    user_id: userId,
                    text: inputText.trim(),
                    likes: 0,
                    isPinned: false,
                    timestamp: Math.floor(Date.now() / 1000)
                };

                const response = await fetch('http://127.0.0.1:5000/api/add_messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataObject),
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                setInputText('');
                await fetchData();
            } catch (error) {
                console.error('Error sending message:', error);
                toast.error('Failed to send message. Please try again.');
            }
        }
    };

    const handleUserListUpdate = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    return (
        <div className="sm:ml-96 flex flex-col h-screen">
            <div className="sticky top-0 z-10 border-b border-b-indigo-200 pl-6 py-4 bg-orange-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button className="transition rounded-full ease-in-out bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 p-2 flex-initial mr-6" onClick={() => redirect("/you/chats/inbox")}>
                            <ChevronLeft className="text-white" size={20} />
                        </button>
                        <div className="text-xl font-semibold text-white">{gcName}</div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => setShowPinnedMessages(true)} className="mr-4">
                            <Pin className="text-white" size={24} />
                        </button>
                        {data && data.is_gc && (
                            <button onClick={() => setShowUserList(true)} className="mr-4">
                                <Users className="text-white" size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                {returnMessageBubbles(data)}
                <div ref={messagesEndRef} />
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200">
                <div className="py-4">
                    <form className="max-w mx-12" onSubmit={(e) => e.preventDefault()}>   
                        <div className="relative">
                            <input 
                                type="text" 
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown} 
                                className="block w-full px-4 py-2 ps-4 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Message..." 
                                required 
                            />
                        </div>
                    </form>
                </div>
            </div>

            {showUserList && data && data.is_gc && (
                <UserListPopup 
                    chatId={chatId} 
                    users={data.users || []} 
                    onClose={() => setShowUserList(false)} 
                    currentUserId={userId || ""}
                    onUpdate={handleUserListUpdate}
                />
            )}

            {showPinnedMessages && data && (
                <PinnedMessagesPopup 
                    messages={Array.isArray(data.messages) 
                        ? data.messages.filter(m => m.isPinned) 
                        : Object.values(data.messages).filter(m => m.isPinned)
                    }
                    onClose={() => setShowPinnedMessages(false)}
                    isGroupChat={data.is_gc}
                />
            )}
        </div>
    );
}

