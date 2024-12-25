import React , {useState} from 'react';
interface Options {
  name: string
  majors: string[]
  minors: string[]
  years: string[]
  residence_halls: string[]
  key: string
  id: string
  groupChatId: string
}

export default function EventCard(options: Options) {

  const majors: JSX.Element[] = options.majors.map(
    major => {
      return (
        <React.Fragment key={major}>
          <span className="underline">{major}</span>&nbsp;
        </React.Fragment>
      )
    }
  );
  const minors: JSX.Element[] = options.minors.map(
    minor => {
      return (
        <React.Fragment key={minor}>
          <span className="underline">{minor}</span>&nbsp;
        </React.Fragment>
      )
    }
  );
  const years: JSX.Element[] = options.years.map(
    year => {
      return (
        <React.Fragment key={year}>
          <span className="underline">{year}</span>&nbsp;
        </React.Fragment>
      )
    }
  );
  const residence_halls: JSX.Element[] = options.residence_halls.map(
    residence_hall => {
      return (
        <React.Fragment key={residence_hall}>
          <span className="underline">{residence_hall}</span>&nbsp;
        </React.Fragment>
      )
    }
  );

  return (
    
      <div key={options.id} style={{cursor: "default"}} className="rounded-lg h-fit min-h-24 bg-slate-400">
          <div className="overflow-hidden h-full px-8 py-4" >

            <div className="text-2xl font-semibold mb-2">{options.name}</div>

            <div>
              <span className="font-bold text-gray-950"> Majors: </span>  
              <span className="text-gray-800"> {majors} </span>
            </div>

            <div>
              <span className="font-bold text-gray-950"> Minors: </span>  
              <span className="text-gray-800"> {minors} </span>
            </div>

            <div>
              <span className="font-bold text-gray-950"> Years: </span>  
              <span className="text-gray-800"> {years} </span>
            </div>

            <div>
              <span className="font-bold text-gray-950"> Residence Halls: </span>  
              <span className="text-gray-800"> {residence_halls} </span>
            </div>

            <div className="mt-4">
              <button id={options.groupChatId} className="w-full transition rounded-lg ease-in-out bg-blue-500 hover:bg-indigo-500 duration-200 p-2 flex-initial">Join</button>
            </div>

            </div>
      </div>
    
  )
}