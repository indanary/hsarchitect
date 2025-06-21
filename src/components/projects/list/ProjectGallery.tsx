import {useEffect, useState} from "react"

interface Project {
	id: number
	title: string
	imageUrl: string
	location: string
}

interface Props {
	category: string
}

export default function ProjectGallery({category}: Readonly<Props>) {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)

		// Dummy data (replace with real API call)
		setTimeout(() => {
			const dummy: Record<string, Project[]> = {
				All: [
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
				],
			}

			setProjects(dummy[category] || [])
			setLoading(false)
		}, 500)
	}, [category])

	if (loading) return <p className="text-white">Loading projects...</p>

	return (
		<div className="overflow-y-auto max-h-[620px]">
			<div className="grid grid-cols-3 gap-4">
				{projects.map((project, index) => (
					<a
						key={index}
						href={`/projects/${project.id}`}
						className="relative group overflow-hidden rounded-md block"
					>
						<img
							src={project.imageUrl}
							alt={project.title}
							className="w-full h-auto object-cover transition duration-300 group-hover:brightness-75"
						/>

						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<p className="text-white text-xs font-semibold">
								{project.title}&nbsp;&nbsp;
								<span className="font-normal text-xs">
									{project.location}
								</span>
							</p>
						</div>
					</a>
				))}
			</div>
		</div>
	)
}
