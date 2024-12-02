'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

import DropdownOptions from "@/app/components/AccountDropdownOptions";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') + "@oregonstate.edu";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    // const { userEmail, setEmail } = useAuth();

    const dataObject = Object.fromEntries(data);
    dataObject.email = email;
    
    const response = await fetch('http://127.0.0.1:5000/api/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
    });
    const json = await response.json();

    localStorage.setItem("email", json.email);
    localStorage.setItem("id", json.id);
    localStorage.setItem("name", json.name);
    localStorage.setItem("username", json.username);
    localStorage.setItem("major", json.major);
    localStorage.setItem("minor", json.minor);
    localStorage.setItem("residence_hall", json.residence_hall);
    localStorage.setItem("year", json.year);
    
    event.preventDefault();
    router.push(`/you/chats/inbox`);
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image
                  className="inline-block align-middle rounded-lg w-12 h-12 mr-2" 
                  src="/favicon.ico" 
                  alt="placeholder"
                  width={300}
                  height={300}
                />
                beavs.social
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" disabled className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email} required={false}/>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eg. John Doe" required={false}/>
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="username" name="username" id="username" placeholder="Enter a username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={false}/>
                        </div>
                        <div>
                            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                            <DropdownOptions.YearDropdownOptions />
                        </div>
                        <div>
                            <label htmlFor="major" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Major</label>
                            <DropdownOptions.MajorDropdownOptions />
                        </div>
                        <div>
                            <label htmlFor="minor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minor (if any)</label>
                            <DropdownOptions.MinorDropdownOptions />
                        </div>
                        <div>
                            <label htmlFor="hall" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Residence Hall (if any)</label>
                            <DropdownOptions.ResidenceHallDropdownOptions />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={false}/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline outline-offset-2 outline-gray-100">Create an account</button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}