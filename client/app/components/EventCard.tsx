interface Options {
  username: string
  key: string
  id: string
}

export default function EventCard(options: Options) {
  return (
    <div key={options.id} style={{cursor: "default"}} className="rounded-lg overflow-y-scroll max-h-32 min-h-24 bg-slate-400 hover:bg-indigo-300 duration-200 hover:scale-105 transition ease-in-out">
      <div className="h-full px-8 pt-4">
        <div className="cols-2 flex items-center">
          <div className="text-2xl font-semibold">{options.username}</div>
        </div>
      </div>
    </div>
  )
}