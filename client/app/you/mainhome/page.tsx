"use client";
import Image from "next/image";
import MainHomePageWall from "@/app/components/MainHomePageWall";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
      <>
      <header className="bg-black">
          <nav className="flex justify-between items-center w-[90%] mx-auto">
              <div>
                  <p className="w-48 text-orange-500 text-xl m-5 font-bold text-center tracking-wide">beavs_social 🦫</p>
              </div>
              <div className="nav-links duration-500 mr-24 md:static absolute md:min-h-fit left-0 top-[-100%] md:w-auto w-full flex items-center p-5">
                  <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-6">
                      <li className="m-2">
                          <a className="text-orange-300 font-medium hover:text-orange-500 transition-colors duration-300 md:text-base text-xl md:mx-auto mx-5" href="#description">App Description</a>
                      </li>
                      <li className="m-2">
                          <a className="text-orange-300 font-medium hover:text-orange-500 transition-colors duration-300 md:text-base text-xl md:mx-auto mx-5" href="#about">About Us</a>
                      </li>
                      <li className="m-2">
                          <a className="text-orange-300 font-medium hover:text-orange-500 transition-colors duration-300 md:text-base text-xl md:mx-auto mx-5" href="#blog">Blog</a>
                      </li>
                      <li className="m-2">
                          <a className="text-orange-300 font-medium hover:text-orange-500 transition-colors duration-300 md:text-base text-xl md:mx-auto mx-5" href="#fundraiser">Fundraiser</a>
                      </li>
                  </ul>
              </div>
          </nav>
      </header>
  
      <section className="section bg-black relative md:-mt-auto not-prose overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-900 to-black opacity-30"
                  animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "reverse",
                  }}
              />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-0 md:pt-[76px] pointer-events-none"/>
          <div className="py-12 md:py-16">
              <div className="text-center pb-10 md:pb-16 max-w-screen-lg mx-auto">
                  <motion.h1 
                      className="text-5xl md:text-8xl font-bold leading-tight tracking-tight mb-4 font-heading text-orange-500"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                  >
                      <span className="text-accent highlight">
                        beavs_social
                      </span>
                  </motion.h1>
  
                  <div className="max-sm:px-4 max-md:px-8 max-lg:px-16 px-32 flex justify-center items-center pt-12 pb-12 drop-shadow-xl">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Image 
                        className="inline-block align-middle rounded-full" 
                        src="/favicon.ico" 
                        alt="Beaver logo"
                        width={220}
                        height={220}
                      />
                    </motion.div>
                  </div>
  
                  <div className="max-w-3xl mx-auto pt-5">
                      <motion.p 
                          className="text-4xl text-muted mb-6 text-orange-300 mt-6 font-bold tracking-wide"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                      >
                          Connect online. Meet offline.
                      </motion.p>
  
                      <div className="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4">
                          <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          >
                              <MainHomePageWall />
                          </motion.div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
      </section>
      </>
    );
  }
