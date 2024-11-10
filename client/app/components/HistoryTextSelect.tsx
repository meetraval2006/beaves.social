"use client";

import { useRouter } from "next/navigation";

interface Options {
  id: number
}

export default function HistoryTextSelect(options: Options) {
  const router = useRouter();
  const handleUserClick = (_: any, id: number): void => router.push(`/you/chats/${id}`);

  return (
    <li>
      <a style={{cursor: "pointer"}} className="flex items-center px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      <svg className="w-2 h-2 fill-current text-red-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>

      <div className="ml-2 text-gray-400">
        Hello, World!
      </div>
      </a>
    </li>
  )
}