"use client"
import Image from "next/image"
import { redirect } from "next/navigation"
import Logo from "@/public/logo.png"
import Sri from "@/public/sri.jpg"
import Kishore from "@/public/kishore.jpg"

const features = [
  "Easy to use interface",
  "Cross-platform compatibility",
  "Real-time synchronization",
  "Advanced security features",
  "Customizable settings",
]

export default function AppDescriptionPage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <div className="absolute top-2 left-2 flex gap-4">
          <button
            className="transition rounded-full bg-orange-600 hover:bg-black text-white hover:text-orange-600 ease-in-out duration-300 p-2 flex-initial"
            onClick={() => redirect("/you/home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={20}
              width={20}
              viewBox="0 0 576 512"
              className="fill-current"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">App Description</h1>
        </header>

        <div className="bg-black shadow-lg rounded-lg overflow-hidden w-full rounded-lg shadow border border-orange-600">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <Image src={Logo || "/placeholder.svg"} alt="App Icon" width={80} height={80} className="rounded-2xl" />
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-orange-500">beavs.social</h2>
                <p className="text-orange-400">By Srivatsav S., Kishore A.</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">Description</h3>
              <p className="text-orange-300">
                The app focuses on creating a collaborative environment that allows users to create chats with students
                and let students create different types of events which lets other students know about different types
                of activities that are happening nearby. A student could also customize their usernames and create group
                chats with the option to create a private dm too.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">Creators</h3>

              <div className="mb-6">
                <Image
                  src={Sri}
                  alt="Back End Engineer"
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto mb-2"
                />
                <p className="text-orange-500 text-center font-semibold mb-4">Back End Engineer</p>
                <p className="text-orange-300">
                  Hello everyone. My name is Srivatsav Sundaresan from Oregon State University Class of 2028. I am an
                  Electrical and Computer Engineering student. I mostly worked on the back end of this app and some
                  front end.
                </p>
              </div>

              <div className="mb-6">
                <Image
                  src={Kishore}
                  alt="Front-End Engineer"
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto mb-2"
                />
                <p className="text-orange-500 text-center font-semibold mb-4">Front-End Engineer</p>
                <p className="text-orange-300">
                  Hello everyone. My name is Kishore Kumar from Oregon State University Class of 2028. I am a Computer
                  Science student. I created most of the front end of this app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

