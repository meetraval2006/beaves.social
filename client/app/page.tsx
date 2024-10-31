import Image from "next/image";

export default function Home() {
  return (
    <>
    <section className="section bg-gray-200 relative md:-mt-auto not-prose">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-0 md:pt-[76px] pointer-events-none"/>
        <div className="py-12 md:py-16">
            <div className="text-center pb-10 md:pb-16 max-w-screen-lg mx-auto">
                <h1 className="text-5xl md:text-8xl font-bold leading-tighter tracking-tighter mb-4 font-heading text-gray-900">
                    <span className="text-accent text-[#ff4e00] highlight">
                      beavs
                    </span>.social
                </h1>

                <div className="max-sm:px-4 max-md:px-8 max-lg:px-16 px-32 flex justify-center items-center pt-12 pb-12 drop-shadow-xl">
                  <Image 
                    className="inline-block align-middle rounded-lg" 
                    src="/favicon.ico" 
                    alt="placeholder"
                    width={220}
                    height={220}
                  />
                </div>

                <div className="max-w-3xl mx-auto pt-5">
                    <p className="text-4xl text-muted mb-6 text-slate-900 mt-6 font-bold">
                        Connect online. Meet offline.
                    </p>

                    <div className="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 ">
                        {/* <link href="https://multiii.github.io/Self-Improvement-Guide/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-3 px-6 rounded-full text-xl">
                            Read the Guide
                        </link> */}
                        <button 
                        className="bg-[#ff4e00] hover:bg-[#BA3800] text-white font-semibold my-8 py-5 px-6 rounded-full text-2xl"
                        
                        >
                          Login with ONID
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
    </>
  );
}
