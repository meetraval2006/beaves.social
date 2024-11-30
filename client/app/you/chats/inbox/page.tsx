import ChatUserSelect from "@/app/components/ChatUserSelect";

export default function Home() {
  return (
    <>
    <a data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="a" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
    </a>

    <aside id="default-sidebar" className="fixed rows-2 border-r border-r-indigo-200 top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
        <div className="h-32 px-2 py-4 pb-32">
            <div className="p-4 py-4">
                <div className="text-2xl font-bold">
                    Your Chats
                </div>
                <div className="py-4">
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
        
        <div className="px-2 py-4 overflow-y-auto">
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

    <div className="p-4 sm:ml-96 flex h-screen">
        <div className="text-center m-auto">
            <div>
                <span className="inline-flex items-center justify-center w-[72px] h-[72px] bg-blue-600 rounded-full mb-4">
                    <svg className="w-9 h-9 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                        <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                        <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                        </svg>
                    <span className="sr-only">Message icon</span>
                </span>
            </div>
            <div className="text-2xl font-bold mb-1">Your messages</div>
            <div className="text-lg">Tap on a chat to continue conversing.</div>
        </div>
    </div>

    </>
  );
}