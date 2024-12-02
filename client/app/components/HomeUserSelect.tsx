interface Options {
  username: string
  key: string
  id: string
}

export default function HomeUserSelect(options: Options) {
  return (
    <div data-modal-target="static-modal" data-modal-toggle="static-modal" key={options.id} style={{cursor: "default"}} className="rounded-lg overflow-y-scroll max-h-32 min-h-24 bg-slate-400 hover:bg-indigo-300 duration-200 hover:scale-105 transition ease-in-out">
      <div className="h-full flex items-center px-8">
        <div className="cols-2 flex items-center">
          <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-14 w-14 mr-3 rounded-full" alt="server-icon"/>
          <div className="text-2xl font-semibold">{options.username}</div>
        </div>
      </div>
    </div>
  )
}