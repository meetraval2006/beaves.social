"use client";
import Image from 'next/image'

const features = [
  "Easy to use interface",
  "Cross-platform compatibility",
  "Real-time synchronization",
  "Advanced security features",
  "Customizable settings"
]

export default function AppDescriptionPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">App Name</h1>
          <p className="text-xl text-gray-600">Simplify Your Life</p>
        </header>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="App Icon"
                width={80}
                height={80}
                className="rounded-2xl"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-gray-900">App Name</h2>
                <p className="text-gray-600">By Developer Name</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

