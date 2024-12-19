"user client";
import { useRouter } from "next/navigation";

export default function MainHomePageWall() {
    const router = useRouter();
    const sendToAppDescription = () => router.push(`/you/description`);
    const sendToChats= () => router.push(`/you/chats/inbox`);
    const sendToEvents = () => router.push(`/you/events`);

    return (
        <>
            <section className="section bg-gray-200 relative md:-mt-auto not-prose">
                <button className="bg-[#ff4e00] hover:bg-[#BA3800] text-white font-semibold my-8 py-5 px-6 rounded-full text-2xl" onClick={sendToChats}>
                    Chats
                </button>
            </section>

            <section className="section bg-gray-200 relative md:-mt-auto not-prose">
                <button className="bg-[#ff4e00] hover:bg-[#BA3800] text-white font-semibold my-8 py-5 px-6 rounded-full text-2xl" onClick={sendToEvents}>
                    Events
                </button>
            </section>
        </>
    );
}