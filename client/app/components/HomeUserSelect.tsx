'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactCardFlip from "react-card-flip";
import { useRouter } from 'next/navigation';

interface Options {
  username: string
  key: string
  id: string
  name: string
  email: string
  major: string
  minor: string
  year: string
  residence_hall: string
}

export default function HomeUserSelect({ username, id, name, email, major, minor, year, residence_hall }: Options) {
  const [flip, setFlip] = useState(false);

  const router = useRouter();

  const handleMessageClick = async () => {
    try {
      const currentUserId = localStorage.getItem('id');
      if (!currentUserId) {
        console.error('Current user ID not found');
        return;
      }

      if (currentUserId == id) {
        setFlip(!flip);
        return;
      }

      // Check if a DM already exists
      const response = await fetch('http://127.0.0.1:5000/api/get_gcs');
      const data = await response.json();

      // Find a DM between the current user and the selected user
      const existingDM = Object.entries(data).find(([chatId, chatData]: [string, any]) => {
        const users = chatData.users || [];
        return !chatData.is_gc && users.includes(currentUserId) && users.includes(id);
      });

      if (existingDM) {
        // DM exists, redirect to it
        router.push(`/you/chats/${existingDM[0]}`);
      } else {
        // Create new DM
        const createResponse = await fetch('http://127.0.0.1:5000/api/create_gc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gc_name: `DM: ${username}`,
            is_gc: false,
            users: [currentUserId, id],
            messages: []
          }),
        });
        const createData = await createResponse.json();

        if (createData) {
          router.push(`/you/chats/${createData.gc_id}`);
        } else {
          console.error('Failed to create DM');
        }
      }
    } catch (error) {
      console.error('Error handling message click:', error);
    }
  };

  const cardVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
  };

  return (
    <div className="perspective-1000 transform-style-preserve-3d transition-transform duration-300">
      <ReactCardFlip isFlipped={flip} flipDirection="horizontal" flipSpeedBackToFront={0.3} flipSpeedFrontToBack={0.3}>
        <div className="backface-hidden transition-transform duration-300">
          <motion.div 
            key={id} 
            className="w-full max-w-sm mx-auto"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0 }}
          >
            <button 
              className="w-full rounded-lg shadow-lg overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                setFlip(!flip);
              }}
            > 
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-1">
                <div className="flex items-center bg-black bg-opacity-90 p-3 space-x-4 rounded-md">
                  <img 
                    src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" 
                    className="h-16 w-16 rounded-full border-2 border-orange-500" 
                    alt="server-icon"
                  />
                  <div className="flex-grow">
                    <div className="text-xl font-semibold text-orange-400 truncate">{username}</div>
                  </div>
                  <svg 
                    className="w-6 h-6 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        <div className="backface-hidden transition-transform duration-300">
          <motion.div 
            key={`${id}-back`} 
            className="w-full max-w-sm mx-auto"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0 }}
          >
            <button 
              className="w-full rounded-lg shadow-lg overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                setFlip(!flip);
              }}
            > 
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-1">
                <div className="flex items-center bg-black bg-opacity-90 p-3 space-x-4 rounded-md">
                  <div className="flex-grow">
                    <div className="text-l font-semibold text-orange-400 truncate">{name}</div>
                    <div className="text-l font-semibold text-orange-400 truncate">{email}</div>
                    <div className="text-l font-semibold text-orange-400 truncate">{year}</div>
                    <div className="text-l font-semibold text-orange-400 truncate">{major}</div>
                    <div className="text-l font-semibold text-orange-400 truncate">{minor}</div>
                    <div className="text-l font-semibold text-orange-400 truncate">{residence_hall}</div>
                  </div>
                  <svg 
                    className="w-6 h-6 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </button>

            <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-1 mt-2 rounded-xl">
              <button
                className="w-full rounded-xl shadow-lg overflow-hidden bg-black bg-opacity-90 text-orange-400 py-2"
                onClick={handleMessageClick}
              >
                Message
              </button>
            </div>
          </motion.div>
        </div>
      </ReactCardFlip>
    </div>
  )
}

