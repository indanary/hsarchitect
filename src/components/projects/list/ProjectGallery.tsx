// src/components/projects/list/ProjectGallery.tsx
import {useEffect, useMemo, useState} from "react"

type ApiProject = {
	id: number | string
	title: string
	location?: string
	cover_url?: string | null
	cover_thumb_url?: string | null
	cover_file_path?: string | null
	cover_alt?: string | null
}

interface Props {
	projectTypeId: string | null // null = All
	initialProjects?: ApiProject[]
}

type UiProject = {
	id: number | string
	title: string
	imageUrl: string // 1600w (fallback/main)
	thumbUrl?: string | null // 800w (thumb)
	location: string
}

function mapToUI(p: ApiProject): UiProject {
	return {
		id: p.id,
		title: p.title,
		location: p.location ?? "",
		imageUrl:
			p.cover_url ?? p.cover_file_path ?? "/images/project-example.png",
		thumbUrl: p.cover_thumb_url ?? null,
	}
}

export default function ProjectGallery({
	projectTypeId,
	initialProjects,
}: Readonly<Props>) {
	const [projects, setProjects] = useState<UiProject[]>(() =>
		initialProjects && initialProjects.length > 0 && projectTypeId === null
			? initialProjects.map(mapToUI)
			: [],
	)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const base = import.meta.env.PUBLIC_API_BASE_URL

	// Build URL for client-side fetch
	const url = useMemo(() => {
		if (!base) return null
		const sp = new URLSearchParams()
		if (projectTypeId) sp.set("project_type_id", projectTypeId)
		const qs = sp.toString()
		return `${base}/projects/public${qs ? `?${qs}` : ""}`
	}, [projectTypeId, base])

	useEffect(() => {
		if (!url) return

		// If we're on "All" and we already have initial projects, use them and skip fetch
		if (
			projectTypeId === null &&
			initialProjects &&
			initialProjects.length > 0
		) {
			setProjects(initialProjects.map(mapToUI))
			setLoading(false)
			setError(null)
			return
		}

		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal, cache: "no-store"})
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
	}, [url, projectTypeId, initialProjects])

	if (loading) return <p className="text-white">Loading projects...</p>
	if (error) return <p className="text-red-400">Failed to load: {error}</p>
	if (!projects.length)
		return <p className="text-white">No projects found.</p>

	return (
		<div className="app-scroll">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-4">
				{projects.map((project, index) => (
					<a
						key={`${project.id}`}
						href={`/projects/${project.id}`}
						className="relative group overflow-hidden block"
					>
						<img
							src={project.thumbUrl ?? project.imageUrl}
							srcSet={
								project.thumbUrl
									? `${project.thumbUrl} 800w, ${project.imageUrl} 1600w`
									: undefined
							}
							sizes="(max-width: 640px) 100vw, 33vw"
							alt={project.title}
							loading={index === 0 ? "eager" : "lazy"}
							{...(index === 0 ? {fetchPriority: "high"} : {})}
							className="w-full h-[180px] xl:h-[372px] object-cover transition duration-300 group-hover:brightness-50"
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
							<p className="text-white text-xs-loose font-bold">
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
