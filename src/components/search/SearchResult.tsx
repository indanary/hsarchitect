import {useEffect, useState} from "react"

interface Project {
	id: number
	title: string
	imageUrl: string
	location: string
}

export default function SearchResult() {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(false)
	const [search, setSearch] = useState("")
	const [debouncedSearch, setDebouncedSearch] = useState("")

	// Debounce effect
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search)
		}, 500) // adjust delay (ms) as needed

		return () => clearTimeout(timer)
	}, [search])

	useEffect(() => {
		setLoading(true)

		// Dummy data (replace with real API call)
		setTimeout(() => {
			const dummy: Project[] = [
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
				{
					id: 1,
					title: "Ria Miranda",
					imageUrl: "/images/project-example.png",
					location: "Semarang",
				},
			]

			setProjects(dummy)
			setLoading(false)
		}, 500)
	}, [debouncedSearch])

	return (
		<div className="flex flex-col h-full gap-8 mt-6">
			{/* input stays static */}
			<input
				value={search}
				type="text"
				placeholder="Search Anything Here"
				className="w-full bg-transparent border-0 border-b border-[#071E50] 
      placeholder-[#071E50] placeholder:text-xs-loose 
      focus:outline-none focus:border-[#071E50] 
      text-[#071E50] text-xs-loose"
				onChange={(e) => setSearch(e.target.value)}
			/>

			{/* scroll only this */}
			<div className="flex-1 overflow-y-auto max-h-[620px]">
				{!loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{projects.map((project, index) => (
							<a
								key={index}
								href={`/projects/${project.id}`}
								className="relative group overflow-hidden block"
							>
								<img
									src={project.imageUrl}
									alt={project.title}
									className="w-full h-auto object-cover transition duration-300 group-hover:brightness-75"
								/>

								<div className="flex items-center mt-2">
									<p className="text-[#071E50] text-xs-loose font-semibold">
										{project.title}&nbsp;&nbsp;
										<span className="font-normal text-xs-loose">
											{project.location}
										</span>
									</p>
								</div>

								<div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<p className="text-white text-xs-loose font-semibold">
										{project.title}&nbsp;&nbsp;
										<span className="font-normal text-xs-loose">
											{project.location}
										</span>
									</p>
								</div>
							</a>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{Array.from({length: 9}).map((_, idx) => (
							<div
								key={idx}
								className="w-full h-[250px] bg-gray-300 animate-pulse"
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
