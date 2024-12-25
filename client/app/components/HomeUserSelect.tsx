'use client'

import React from "react";
import { motion } from "framer-motion";

interface Options {
  username: string
  key: string
  id: string
}

export default function HomeUserSelect({ username, id }: Options) {
  return (
    <div 
      data-modal-target="static-modal" 
      data-modal-toggle="static-modal" 
      key={id} 
      className="w-full max-w-sm mx-auto"
    >
      <motion.button 
        className="w-full rounded-lg shadow-lg overflow-hidden"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
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
      </motion.button>
    </div>
  )
}

