"use client";
import Image from "next/image";
import MainHomePageWall from "@/app/components/MainHomePageWall";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <header>
        <nav className="flex justify-between items-center w-[90%] mx-auto">
            <div>
                <p className="w-48 text-slate-50 text-xl m-5 font-bold text-center">beavs.social 🤝</p>
            </div>

            <div className="nav-links duration-500 mr-24 md:static absolute md:min-h-fit left-0 top-[-100%] md:w-auto w-full flex items-center p-5">
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-6">
                    <li className="m-2">
                        <Link href="/you/description" className="text-slate-200 font-medium hover:text-white md:text-base text-xl md:mx-auto mx-5">
                           App Description
                        </Link>
                    </li>
                    <li className="m-2">
                        <a className="text-slate-200 font-medium hover:text-white md:text-base text-xl md:mx-auto mx-5" href="#about">About Us</a>
                    </li>
                    <li className="m-2">
                        <a className="text-slate-200 font-medium hover:text-white md:text-base text-xl md:mx-auto mx-5" href="#blog">Blog</a>
                    </li>
                    <li className="m-2">
                        <a className="text-slate-200 font-medium hover:text-white md:text-base text-xl md:mx-auto mx-5" href="#fundraiser">Fundraiser</a>
                    </li>
                </ul>
            </div>

        </nav>
    </header>

    <section className="section bg-gray-200 relative md:-mt-auto not-prose">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-0 md:pt-[76px] pointer-events-none"/>
        <div className="py-12 md:py-16">
            <div className="text-center pb-10 md:pb-16 max-w-screen-lg mx-auto">
                <h1 className="text-5xl md:text-8xl font-bold leading-tighter tracking-tighter mb-4 font-heading text-gray-900">
                    <span className="text-accent text-[#ff4e00] highlight">
                      beavs.social
                    </span>
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
                </div>

                <div className="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 ">
                        <MainHomePageWall />
                </div>
            </div>
        </div>
        </div>
    </section>
    </>
  );
}
