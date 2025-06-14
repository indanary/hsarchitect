import {useEffect, useState} from "react"

interface Project {
	id: number
	title: string
	imageUrl: string
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
						id: 1015,
						title: "Project 1",
						imageUrl: "https://picsum.photos/id/1015/400/300",
					},
					{
						id: 1016,
						title: "Project 2",
						imageUrl: "https://picsum.photos/id/1016/400/300",
					},
					{
						id: 1018,
						title: "Project 3",
						imageUrl: "https://picsum.photos/id/1018/400/300",
					},
					{
						id: 1019,
						title: "Project 4",
						imageUrl: "https://picsum.photos/id/1019/400/300",
					},
					{
						id: 1020,
						title: "Project 5",
						imageUrl: "https://picsum.photos/id/1020/400/300",
					},
					{
						id: 1021,
						title: "Project 6",
						imageUrl: "https://picsum.photos/id/1021/400/300",
					},
				],
				Residential: [
					{
						id: 1015,
						title: "Residential 1",
						imageUrl: "https://picsum.photos/id/1015/400/300",
					},
					{
						id: 1016,
						title: "Residential 2",
						imageUrl: "https://picsum.photos/id/1016/400/300",
					},
				],
				Commercial: [
					{
						id: 1018,
						title: "Commercial 1",
						imageUrl: "https://picsum.photos/id/1018/400/300",
					},
					{
						id: 1020,
						title: "Commercial 2",
						imageUrl: "https://picsum.photos/id/1020/400/300",
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
			<div className="grid grid-cols-2 gap-4">
				{projects.map((project) => (
					<img
						key={project.id}
						src={project.imageUrl}
						alt={project.title}
						className="w-full h-auto object-cover"
					/>
				))}
			</div>
		</div>
	)
}
