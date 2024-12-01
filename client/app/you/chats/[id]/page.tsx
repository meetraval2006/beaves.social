"use client";

import { usePathname, redirect } from 'next/navigation';

import ChatUserSelect from "@/app/components/ChatUserSelect";

export default function Home() {
  const pathname = usePathname();
  return (
    <>
    <a data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="a" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
    </a>

    <aside id="default-sidebar" className="fixed rows-2 border-r border-r-indigo-200 top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-32 px-2 py-4 pb-32">
            <div className="p-4 py-4">
                <div className="flex gap-4">
                  <button className="transition rounded-full ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-2 flex-initial" onClick={() => redirect("/you/home")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 576 512">
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                    </svg>
                  </button>
                  <div className="text-2xl font-bold">
                      Your Chats
                  </div>
                </div>
                <div className="pb-4 pt-6">
                    <form className="max-w-md mx-auto">   
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        </div>
                    </form>
                </div>

            </div>
        </div>
        
        <div className="px-2 pb-4 pt-2 overflow-y-auto">
            <ul className="font-medium">
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
                    <ChatUserSelect username={"User"} latestMessageAuthor={"Foo"} latestMessageText={"Hi"} />
            </ul>
        </div>
    </aside>

    <div className="sm:ml-96 flex flex-col h-screen">
      <div className="basis-1/12 border-b border-b-indigo-200 pl-6 py-4">
        <div className="flex items-center">
          <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
          <div className="text-xl font-semibold">User #{pathname.split("/")[3]}</div>
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

    </>
  );
}