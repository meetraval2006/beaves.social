'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactCardFlip from "react-card-flip";

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

