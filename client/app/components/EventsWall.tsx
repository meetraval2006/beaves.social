import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, FilterIcon, XIcon } from "lucide-react"
import EventCard from "./EventCard"

export default function EventsWall() {
  const [events, setEvents] = useState([])
  const [userId, setUserId] = useState("")
  const [filters, setFilters] = useState({
    major: "",
    minor: "",
    year: "",
    residenceHall: "",
    netType: "",
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get_events")
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        } else {
          console.error("Failed to fetch events")
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    fetchEvents()
    setUserId(localStorage.getItem("id") || "")
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  const filteredEvents = events.filter((event) => {
    return (
      (filters.major === "" || event.majors.includes(filters.major)) &&
      (filters.minor === "" || event.minors.includes(filters.minor)) &&
      (filters.year === "" || event.years.includes(filters.year)) &&
      (filters.residenceHall === "" || event.residence_halls.includes(filters.residenceHall)) &&
      (filters.netType === "" || event.netType === filters.netType)
    )
  })

  const handleDeleteEvent = (deletedEventId) => {
    setEvents(events.filter((event) => event.id !== deletedEventId))
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      major: "",
      minor: "",
      year: "",
      residenceHall: "",
      netType: "",
    })
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="relative">
        <motion.button
          onClick={toggleFilter}
          className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FilterIcon size={20} />
          <span>Filter Nets</span>
          {activeFiltersCount > 0 && (
            <span className="bg-white text-orange-500 rounded-full px-2 py-1 text-xs font-bold">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDownIcon
            size={20}
            className={`transform transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
          />
        </motion.button>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              ref={filterRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
            >
              <div className="p-4 space-y-4">
                <FilterSelect
                  label="Major"
                  value={filters.major}
                  onChange={(value) => handleFilterChange("major", value)}
                  options={[
                    "All Majors",
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
                  ]}
                />
                <FilterSelect
                  label="Minor"
                  value={filters.minor}
                  onChange={(value) => handleFilterChange("minor", value)}
                  options={[
                    "All Minors",
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
                  ]}
                />
                <FilterSelect
                  label="Year"
                  value={filters.year}
                  onChange={(value) => handleFilterChange("year", value)}
                  options={["All Years", "Freshman", "Sophomore", "Junior", "Senior", "Masters", "PhD"]}
                />
                <FilterSelect
                  label="Residence Hall"
                  value={filters.residenceHall}
                  onChange={(value) => handleFilterChange("residenceHall", value)}
                  options={[
                    "All Residence Halls",
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
                  ]}
                />
                <FilterSelect
                  label="Net Type"
                  value={filters.netType}
                  onChange={(value) => handleFilterChange("netType", value)}
                  options={["All Net Types", "Social", "Project", "Interest"]}
                />
                <motion.button
                  onClick={clearFilters}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} userId={userId} onDelete={handleDeleteEvent} />
        ))}
      </div>
    </div>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-orange-300 mb-1">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md bg-gray-700 text-white"
      >
        {options.map((option) => (
          <option key={option} value={option === `All ${label}s` ? "" : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

