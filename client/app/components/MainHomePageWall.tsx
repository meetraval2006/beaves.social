"user client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function MainHomePageWall() {
    const router = useRouter();
    const sendToAppDescription = () => router.push(`/you/description`);
    const sendToChats= () => router.push(`/you/chats/inbox`);
    const sendToEvents = () => router.push(`/you/events`);

    return (
            <div className="section bg-gray-200 relative md:-mt-auto not-prose">
                 <motion.button
                    className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 tracking-wide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={sendToChats}
                  >
                    Chats
                  </motion.button>
          
                  <motion.button
                    className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 tracking-wide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={sendToEvents}
                  >
                    Events
                  </motion.button>

                  <motion.button
                    className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 tracking-wide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={sendToAppDescription}
                  >
                    About the Creators and the App
                  </motion.button>
            </div>
    );
}