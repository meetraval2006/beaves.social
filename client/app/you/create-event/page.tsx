"use client"

import Image from "next/image"
import { useRouter, redirect } from "next/navigation"
import { useState } from "react"
import Logo from "@/public/logo.png"
import { Toaster, toast } from "react-hot-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CreateEventForm() {
  const router = useRouter()
  const [eventName, setEventName] = useState("")
  const [years, setYears] = useState<string[]>([])
  const [majors, setMajors] = useState<string[]>([])
  const [minors, setMinors] = useState<string[]>([])
  const [halls, setHalls] = useState<string[]>([])
  const [description, setDescription] = useState("")

  const majorOptions = [
    "All",
    "Accountancy",
    "Agricultural and Food Business Management",
    "Agricultural Sciences",
    "American Studies",
    "Animal Sciences",
    "Anthropology",
    "Apparel Design",
    "Applied Humanities",
    "Architectural Engineering",
    "Art",
    "Arts, Media and Technology",
    "Biochemistry and Biophysics",
    "Biochemistry and Molecular Biology",
    "Bioengineering",
    "BioHealth Sciences",
    "Biological Data Sciences",
    "Biology",
    "Bioresource Research",
    "Botany",
    "Business Administration",
    "Business Analytics",
    "Business Information Systems",
    "Chemical Engineering",
    "Chemistry",
    "Civil Engineering",
    "Climate Science",
    "Computer Science",
    "Construction Engineering Management",
    "Contemporary Music Industry",
    "Creative Writing",
    "Crop and Soil Science",
    "Design and Innovation Management",
    "Digital Communication Arts",
    "Ecological Engineering",
    "Economics",
    "Education",
    "Electrical and Computer Engineering",
    "Energy Systems Engineering",
    "Engineering Science",
    "English",
    "Environmental Economics and Policy",
    "Environmental Engineering",
    "Environmental Sciences",
    "Ethnic Studies",
    "Finance",
    "Fisheries, Wildlife, and Conservation Sciences",
    "Food Science and Sustainable Technologies",
    "Forest Engineering - Civil Engineering",
    "Forest Engineering",
    "Forestry",
    "French",
    "Geography and Geospatial Science",
    "Geology",
    "German",
    "Graphic Design",
    "History",
    "Honors Associate",
    "Honors Scholar",
    "Horticulture",
    "Hospitality Management",
    "Human Development and Family Sciences",
    "Industrial Engineering",
    "Innovation Management",
    "Interior Design",
    "International Studies",
    "Kinesiology",
    "Liberal Studies",
    "Manufacturing Engineering",
    "Marine Studies",
    "Marketing",
    "Mathematics",
    "Mechanical Engineering",
    "Microbiology",
    "Music Studies",
    "Music",
    "Natural Resources",
    "Nuclear Engineering",
    "Nutrition",
    "Oceanography",
    "Organizational Leadership",
    "Outdoor Products",
    "Philosophy",
    "Physics",
    "Political Science",
    "Product and Merchandising Management",
    "Psychology",
    "Public Health",
    "Public Policy",
    "Radiation Health Physics",
    "Rangeland Sciences",
    "Religious Studies",
    "Social Science",
    "Sociology",
    "Spanish",
    "Speech Communication",
    "Supply Chain and Logistics Management",
    "Sustainability",
    "Teaching",
    "Theatre Arts",
    "Tourism, Recreation, and Adventure Leadership",
    "Women, Gender, and Sexuality Studies",
    "Wood Innovation for Sustainability",
    "Zoology",
  ]

  const minorOptions = [
    "All",
    "Accounting",
    "Actuarial Science",
    "Aerospace Engineering",
    "Aerospace Studies",
    "Agricultural and Food Business Management",
    "Agricultural Education",
    "Agricultural Sciences and Natural Resources Communications",
    "Agricultural Sciences",
    "Animal Sciences",
    "Anthropology",
    "Applied Journalism",
    "Art History",
    "Arts, Media and Technology",
    "Asian Languages and Cultures",
    "Asian Studies",
    "Biochemistry and Molecular Biology",
    "Biological Data Sciences",
    "Biology",
    "Botany",
    "Business Information Systems",
    "Business",
    "Chemistry",
    "Communication",
    "Comparative International Agriculture",
    "Computer Science",
    "Contemplative Studies",
    "Criminology",
    "Crop Science",
    "Cybersecurity Management",
    "Design and Innovation Management",
    "Early Childhood Development and Education",
    "Earth Sciences",
    "Economics",
    "Education",
    "English",
    "Entomology",
    "Environmental and Occupational Health",
    "Environmental Economics and Policy",
    "Environmental Engineering",
    "Environmental Law and Policy",
    "Environmental Sciences",
    "Ethnic Studies",
    "Exercise Physiology",
    "Family Business",
    "Fermentation Science",
    "Film Studies",
    "Finance",
    "Fisheries and Wildlife Sciences",
    "Food Manufacturing",
    "Food Science",
    "Food Technology",
    "Forestry",
    "French",
    "Geography",
    "Geology",
    "Geomatics Engineering",
    "German",
    "Global Development Studies",
    "Global Health",
    "Graphic Design",
    "Guitar",
    "Health Management and Policy",
    "History",
    "Horticulture",
    "Human Development and Family Sciences",
    "Human Resource Management",
    "Humanitarian Engineering",
    "Indigenous Studies",
    "Industrial Engineering",
    "Innovation and Entrepreneurship",
    "International Engineering",
    "Irrigation Engineering",
    "Latinx/a/o Studies",
    "Leadership",
    "Marine Biology",
    "Marine Conservation and Management",
    "Marine Studies",
    "Marketing",
    "Materials Science",
    "Mathematics",
    "Merchandising Management",
    "Microbiology",
    "Military History",
    "Military Science",
    "Music",
    "Music Performance",
    "Natural Resources",
    "Naval Science-U.S. Marine Corps",
    "Naval Science-U.S. Navy",
    "New Media Communications",
    "Nuclear Engineering",
    "Nutrition",
    "Oceanography",
    "Organizational Leadership",
    "Outdoor Products",
    "Philosophy",
    "Photography",
    "Physics",
    "Political Science",
    "Popular Music Studies",
    "Professional Sales",
    "Psychology",
    "Public Health",
    "Queer Studies",
    "Radiation Health Physics",
    "Rangeland Science",
    "Religious Studies",
    "Social Justice",
    "Sociology",
    "Soil Science",
    "Spanish",
    "Sports Business",
    "Statistics",
    "Studio Art",
    "Supply Chain and Logistics Management",
    "Sustainability",
    "Theatre Arts",
    "Tourism, Recreation, and Adventure Leadership",
    "Toxicology",
    "Turf and Landscape Management",
    "User Experience Research",
    "Women, Gender, and Sexuality Studies",
    "Wood Innovation for Sustainability",
    "Wood Products Sales",
    "Writing",
  ]

  const yearOptions = ["All", "Freshman", "Sophomore", "Junior", "Senior", "Masters", "PhD"]

  const residenceHallOptions = [
    "All",
    "Bloss Hall",
    "Buxton Hall",
    "Callahan Hall",
    "Cauthorn Hall",
    "Dixon Lodge",
    "Finley Hall",
    "Halsell Hall",
    "Hawley Hall",
    "ILLC",
    "McNary Hall",
    "Poling Hall",
    "Sackett Hall",
    "Tebeau Hall",
    "Weatherford Hall",
    "West Hall",
    "Wilson Hall",
  ]

  const handleOptionChange = (
    option: string,
    currentState: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (option === "All") {
      setter(["All"])
    } else {
      setter((prev) => {
        if (prev.includes("All")) {
          return [option]
        } else {
          const newState = prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
          return newState.length === 0 ? ["All"] : newState
        }
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    console.log(localStorage.getItem("id"))

    const data = {
      name: eventName,
      majors: majors.length === 0 ? ["All"] : majors,
      minors: minors.length === 0 ? ["All"] : minors,
      years: years.length === 0 ? ["All"] : years,
      residence_halls: halls.length === 0 ? ["All"] : halls,
      eventDescription: description,
      authorId: localStorage.getItem("id"),
    }

    const response = await fetch("http://127.0.0.1:5000/api/create_event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      console.log("Event created successfully")
      toast.success("Event created successfully!")
      router.push("/you/events")
    } else {
      console.error("Failed to create event")
      toast.error("Failed to create event. Please try again.")
    }
  }

  return (
    <>
      <div className="relative">
        <div className="absolute top-2 left-2 flex gap-4">
          <button
            className="transition rounded-full bg-orange-600 hover:bg-gray-800 text-white hover:text-orange-600 ease-in-out duration-300 p-2"
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
      <section className="bg-gray-900 min-h-screen flex items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-orange-500">
            <Image
              className="inline-block align-middle rounded-lg w-12 h-12 mr-2"
              src={Logo || "/placeholder.svg"}
              alt="placeholder"
              width={300}
              height={300}
            />
            beavs.social
          </a>
          <div className="w-full bg-gray-800 rounded-lg shadow border border-orange-600">
            <div className="p-6 space-y-6">
              <h1 className="text-xl font-bold text-orange-400">Create an event</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-orange-400">
                    Name of the event
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter event name"
                    className="bg-gray-700 border border-orange-500 text-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value.slice(0, 75))}
                    maxLength={75}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-orange-400">
                    What year student are you looking for?
                  </label>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-orange-600 bg-gray-700 p-4 text-white">
                    {yearOptions.map((year) => (
                      <div key={year} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`year-${year}`}
                          checked={years.includes(year)}
                          onCheckedChange={() => handleOptionChange(year, years, setYears)}
                          className="border-white"
                        />
                        <Label htmlFor={`year-${year}`} className="text-white">
                          {year}
                        </Label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-orange-400">
                    What major are you looking for (be specific)?
                  </label>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-orange-600 bg-gray-700 p-4 text-white">
                    {majorOptions.map((major) => (
                      <div key={major} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`major-${major}`}
                          checked={majors.includes(major)}
                          onCheckedChange={() => handleOptionChange(major, majors, setMajors)}
                          className="border-white"
                        />
                        <Label htmlFor={`major-${major}`} className="text-white">
                          {major}
                        </Label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-orange-400">Minor (if any)</label>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-orange-600 bg-gray-700 p-4 text-white">
                    {minorOptions.map((minor) => (
                      <div key={minor} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`minor-${minor}`}
                          checked={minors.includes(minor)}
                          onCheckedChange={() => handleOptionChange(minor, minors, setMinors)}
                          className="border-white"
                        />
                        <Label htmlFor={`minor-${minor}`} className="text-white">
                          {minor}
                        </Label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-orange-400">Residence Hall (if any)</label>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-orange-600 bg-gray-700 p-4 text-white">
                    {residenceHallOptions.map((hall) => (
                      <div key={hall} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`hall-${hall}`}
                          checked={halls.includes(hall)}
                          onCheckedChange={() => handleOptionChange(hall, halls, setHalls)}
                          className="border-white"
                        />
                        <Label htmlFor={`hall-${hall}`} className="text-white">
                          {hall}
                        </Label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-orange-400">
                    Description of the Event
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="What is your event about?"
                    className="bg-gray-700 border border-orange-500 text-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 150))}
                    maxLength={150}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an event
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  )
}

