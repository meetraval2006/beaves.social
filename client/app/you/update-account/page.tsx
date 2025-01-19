'use client';

import Image from "next/image";
import { useRouter, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import DropdownOptions from "@/app/components/AccountDropdownOptions";
import Logo from "@/public/logo.png";
import { ChevronLeft } from 'lucide-react';

export default function UpdateAccount() {
  const router = useRouter();
  const [id, setUserId] = useState<string | null>(null);
  const [emailPrefix, setEmailPrefix] = useState<string | null>(null);
  const email = emailPrefix ? `${emailPrefix}@oregonstate.edu` : "";

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      const userResponse = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await userResponse.json();
      if (userData?.email) {
        setEmailPrefix(userData.email.split('@oregonstate.edu')[0]);
      }
    };
    fetchUserData();
  }, [id]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(data);
    dataObject.email = email;
    dataObject.id = id ?? "";

    const response = await fetch('http://127.0.0.1:5000/api/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
    });

    const json = await response.json();

    if (response.ok) {
      Object.entries(json).forEach(([key, value]) => {
        localStorage.setItem(key, value as string);
      });
      console.log('Account successfully updated');
      router.push(`/you/chats/home`);
    } else {
      console.error('Failed to update account');
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4">
        <button
          className="transition rounded-full bg-orange-600 hover:bg-orange-700 p-2"
          onClick={() => redirect("/you/home")}
        >
          <ChevronLeft size={24} />
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-2">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Image
              className="rounded-lg w-12 h-12 mb-1"
              src={Logo || "/placeholder.svg"}
              alt="beavs.social logo"
              width={48}
              height={48}
            />
            <h1 className="text-xl font-semibold text-orange-500">
              beavs.social
            </h1>
          </div>

          <div className="w-full max-w-md bg-gray-900 rounded-lg shadow border border-orange-600 p-4 space-y-4">
            <h2 className="text-lg font-bold text-orange-500 mb-2">
              Update your account
            </h2>
            <form className="space-y-3" onSubmit={onSubmit}>
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-orange-400">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-black border border-orange-500 text-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2 text-sm"
                  value={email}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-orange-400">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Eg. John Doe"
                  className="bg-black border border-orange-500 text-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="username" className="block mb-1 text-sm font-medium text-orange-400">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter a username"
                  className="bg-black border border-orange-500 text-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="year" className="block mb-1 text-sm font-medium text-orange-400">
                  Year
                </label>
                <DropdownOptions.YearDropdownOptions />
              </div>
              <div>
                <label htmlFor="major" className="block mb-1 text-sm font-medium text-orange-400">
                  Major
                </label>
                <DropdownOptions.MajorDropdownOptions />
              </div>
              <div>
                <label htmlFor="minor" className="block mb-1 text-sm font-medium text-orange-400">
                  Minor (if any)
                </label>
                <DropdownOptions.MinorDropdownOptions />
              </div>
              <div>
                <label htmlFor="hall" className="block mb-1 text-sm font-medium text-orange-400">
                  Residence Hall (if any)
                </label>
                <DropdownOptions.ResidenceHallDropdownOptions />
              </div>
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-orange-500 rounded bg-black focus:ring-orange-500"
                />
                <label htmlFor="terms" className="ml-3 text-sm font-light text-orange-300">
                  I accept the{" "}
                  <a className="font-medium text-orange-500 hover:underline" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Update your account
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

