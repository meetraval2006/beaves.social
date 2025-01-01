'use client';

import Image from "next/image";
import { useRouter, useSearchParams, redirect } from 'next/navigation';
import { useState } from 'react';
import EventDropdownOptions from "@/app/components/EventDropDown";
import Logo from "@/public/logo.png";

export default function CreateEventForm() {
  const router = useRouter();
  const [data, setData] = useState('')

  const sendPostRequest = async () => {
    let response = await fetch('http://127.0.0.1:5000/api/create_event', {
        method: "POST",
        body: JSON.stringify({
          name: "name",
          majors: "majors",
          minors: "minors",
          years: "years",
          residence_halls: "residence_halls",
          event_description: "event_description"
        })
    }),
    headers:{
      'Content-Type': 'application/json'
    }
    response = await response.json();
    router.push('/you/events')
    //alert(response.data)
}

  return (
    <>
      <div className="relative">
        <div className="absolute top-2 left-2 flex gap-4">
          <button
            className="transition rounded-full bg-orange-600 hover:bg-black text-white hover:text-orange-600 ease-in-out duration-300 p-2"
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
      <section className="bg-gray-100 dark:bg-black min-h-screen flex items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-orange-500"
          >
            <Image
              className="inline-block align-middle rounded-lg w-12 h-12 mr-2"
              src={Logo}
              alt="placeholder"
              width={300}
              height={300}
            />
            beavs.social
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border dark:border-orange-600 dark:bg-black">
            <div className="p-6 space-y-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-orange-500">
                Create an event
              </h1>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Name of the event
                  </label>
                  <input
                    type="text"
                    name="name"
                    
                    id="name"
                    placeholder="Eg. John Doe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-black dark:border-orange-500 dark:text-orange-300"
                  />
                </div>
              
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    What year student are you looking for?
                  </label>
                  <EventDropdownOptions.YearDropdownOptions />
                </div>

                <div>
                  <label
                    htmlFor="major"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    What major are you looking for?
                  </label>
                  <EventDropdownOptions.MajorDropdownOptions />
                </div>

                <div>
                  <label
                    htmlFor="minor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Minor (if any)
                  </label>
                  <EventDropdownOptions.MinorDropdownOptions />
                </div>

                <div>
                  <label
                    htmlFor="hall"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Residence Hall (if any)
                  </label>
                  <EventDropdownOptions.ResidenceHallDropdownOptions />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Description of the Event
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="What is your event"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-black dark:border-orange-500 dark:text-orange-300"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-orange-800"
                  onClick={sendPostRequest}
                >
                  Create an event
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
