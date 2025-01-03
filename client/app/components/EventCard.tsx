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
  const majors = Array.isArray(options.majors) ? options.majors : [];
  const minors = Array.isArray(options.minors) ? options.minors : [];
  const years = Array.isArray(options.years) ? options.years : [];
  const residence_halls = Array.isArray(options.residence_halls) ? options.residence_halls : [];
  
  const majorElements: JSX.Element[] = majors.map(
    major => {
      return (
        <React.Fragment key={major}>
          <span className="underline">{major}</span>&nbsp;
        </React.Fragment>
      )
    }
  );
  const minorElements: JSX.Element[] = minors.map(
    minor => {
      return (
        <React.Fragment key={minor}>
          <span className="underline">{minor}</span>&nbsp;
        </React.Fragment>
      )
    }
  );
  const yearElements: JSX.Element[] = years.map(
    year => {
      return (
        <React.Fragment key={year}>
          <span className="underline">{year}</span>&nbsp;
        </React.Fragment>
      )
    }
  );
  const residenceHallElements: JSX.Element[] = residence_halls.map(
    residence_hall => {
      return (
        <React.Fragment key={residence_hall}>
          <span className="underline">{residence_hall}</span>&nbsp;
        </React.Fragment>
      )
    }
  );

  return (
    
      <div key={options.id} style={{cursor: "default"}} className="bg-gradient-to-r from-orange-400 to-orange-600 p-1 rounded-lg">
        <div className="flex items-center bg-black bg-opacity-90 p-3 space-x-4 rounded-lg">
          <div className="overflow-hidden h-auto px-8 py-4" >

            <div className="text-xl font-semibold text-orange-400 truncate">{options.name}</div>

            <div>
              <span className="font-bold text-slate-200	"> Majors: </span>  
              <span className="text-m  text-orange-400 truncate"> {majorElements} </span>
            </div>

            <div>
              <span className="font-bold text-slate-200	"> Minors: </span>  
              <span className="text-m text-orange-400 truncate"> {minorElements} </span>
            </div>

            <div>
              <span className="font-bold text-slate-200	"> Years: </span>  
              <span className="text-m text-orange-400 truncate"> {yearElements} </span>
            </div>

            <div>
              <span className="font-bold text-slate-200	"> Residence Halls: </span>  
              <span className="text-m text-orange-400 truncate"> {residenceHallElements} </span>
            </div>

            <div className="mt-4">
              <button id={options.groupChatId} className="w-full transition rounded-lg ease-in-out bg-orange-500 hover:bg-orange-400 duration-100 p-2 flex-initial text-slate-200	font-semibold">Join</button>
            </div>

            </div>
          </div>
      </div>
    
  )
}