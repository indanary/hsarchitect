import {useEffect, useMemo, useState} from "react"

type ApiProject = {
	id: number | string
	title: string
	location?: string
	// cover fields from your public list API:
	cover_url?: string | null
	cover_file_path?: string | null
	cover_alt?: string | null
}

interface Props {
	projectTypeId: string | null // null = All
}

type UiProject = {
	id: number | string
	title: string
	imageUrl: string
	location: string
}

function mapToUI(p: ApiProject): UiProject {
	return {
		id: p.id,
		title: p.title,
		location: p.location ?? "",
		imageUrl:
			p.cover_url ?? p.cover_file_path ?? "/images/project-example.png",
	}
}

export default function ProjectGallery({projectTypeId}: Readonly<Props>) {
	const [projects, setProjects] = useState<UiProject[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const url = useMemo(() => {
		const sp = new URLSearchParams()
		if (projectTypeId) sp.set("project_type_id", projectTypeId)
		const qs = sp.toString()
		return qs ? `/api/projects.json?${qs}` : `/api/projects.json`
	}, [projectTypeId])

	useEffect(() => {
		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal})
			.then(async (r) => {
				if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
				const data = (await r.json()) as ApiProject[]
				if (!cancelled) setProjects(data.map(mapToUI))
			})
			.catch((e) => {
				if (!cancelled) setError(e.message || "Failed to load projects")
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
			ctrl.abort()
		}
	}, [url])

	if (loading) return <p className="text-white">Loading projects...</p>
	if (error) return <p className="text-red-400">Failed to load: {error}</p>
	if (!projects.length)
		return <p className="text-white">No projects found.</p>

	return (
		<div className="overflow-y-auto max-h-[620px] app-scroll">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
				{projects.map((project) => (
					<a
						key={`${project.id}`}
						href={`/projects/${project.id}`}
						className="relative group overflow-hidden block"
					>
						<img
							src={project.imageUrl}
							alt={project.title}
							loading="lazy"
							className="w-full h-auto object-cover transition duration-300 group-hover:brightness-75"
						/>

						{/* mobile caption */}
						<div className="flex sm:hidden items-center mt-2">
							<p className="text-white text-xs-loose font-semibold">
								{project.title}&nbsp;&nbsp;
								<span className="font-normal text-xs-loose">
									{project.location}
								</span>
							</p>
						</div>

						{/* desktop hover overlay */}
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
		</div>
	)
}
