enum Options {
  Year,
  Major,
  Minor,
  ResidenceHall
};

const year = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
];

const majors = [
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
  "Arts, Media, and Technology",
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
  "Zoology"

];

const minors = [
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
  "Arts, Media, and Technology",
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
];

const residenceHalls = [
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
];

const DropdownOptions = (options: Options) => {
  let dropdownOptions: string[] = [];
  let name: string = "";

  if (options === Options.Year) {
    dropdownOptions = year;
    name = "year";
  }

  else if (options === Options.Major) {
    dropdownOptions = majors;
    name = "major";
  }

  else if (options === Options.Minor) {
    dropdownOptions = minors;
    name = "minor";
  }

  else if (options === Options.ResidenceHall) {
    dropdownOptions = residenceHalls;
    name = "residence_hall";
  }

  return (
    <select name={name} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={false}>
      {dropdownOptions.map(
        (option) => <option key={option} value={option}>{option}</option>
      )}
    </select>
  );
};

const YearDropdownOptions = () => {
  return DropdownOptions(Options.Year);
};

const MajorDropdownOptions = () => {
  return DropdownOptions(Options.Major);
};

const MinorDropdownOptions = () => {
  return DropdownOptions(Options.Minor);
};

const ResidenceHallDropdownOptions = () => {
  return DropdownOptions(Options.ResidenceHall);
};

export default { YearDropdownOptions, MajorDropdownOptions, MinorDropdownOptions, ResidenceHallDropdownOptions };