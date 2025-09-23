// src/components/search/SearchResult.tsx
import {useEffect, useMemo, useState} from "react"

type ApiProject = {
	id: number | string
	title: string
	location?: string | null
	cover_url?: string | null
	cover_thumb_url?: string | null
	cover_file_path?: string | null
}

type Project = {
	id: number | string
	title: string
	imageUrl: string // 1600w main (fallback)
	thumbUrl?: string | null // 800w thumb
	location: string
}

export default function SearchResult() {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [search, setSearch] = useState("")
	const [debouncedSearch, setDebouncedSearch] = useState("")

	// Debounce input
	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(search.trim()), 500)
		return () => clearTimeout(t)
	}, [search])

	// ✅ Build backend URL directly (static-hosting friendly)
	const url = useMemo(() => {
		const sp = new URLSearchParams()
		if (debouncedSearch) sp.set("q", debouncedSearch)
		const qs = sp.toString()
		const base = import.meta.env.PUBLIC_API_BASE_URL
		return `${base}/projects/public${qs ? `?${qs}` : ""}`
	}, [debouncedSearch])

	useEffect(() => {
		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal, cache: "no-store"})
			.then(async (r) => {
				if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
				return (await r.json()) as ApiProject[]
			})
			.then((data) => {
				if (cancelled) return
				const mapped: Project[] = data.map((p) => ({
					id: p.id,
					title: p.title,
					location: p.location ?? "",
					imageUrl:
						p.cover_url ??
						p.cover_file_path ??
						"/images/project-example.png",
					thumbUrl: p.cover_thumb_url ?? null,
				}))
				setProjects(mapped)
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

	// --- render states without ternary ---
	let content: React.ReactNode

	if (loading) {
		content = (
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{Array.from({length: 9}).map((_, idx) => (
					<div
						key={idx}
						className="w-full h-[256px] bg-gray-300 animate-pulse"
					/>
				))}
			</div>
		)
	} else if (error) {
		content = <p className="text-red-500">{error}</p>
	} else if (projects.length === 0) {
		content = (
			<p className="text-[#071E50] text-xs-loose">No projects found.</p>
		)
	} else {
		content = (
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{projects.map((project) => (
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
							loading="lazy"
							className="w-full h-[256px] object-cover transition duration-300 group-hover:brightness-75"
						/>

						{/* mobile caption */}
						<div className="flex sm:hidden items-center mt-2">
							<p className="text-[#071E50] text-xs-loose font-semibold">
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
		)
	}

	return (
		<div className="flex flex-col h-full gap-8 mt-6">
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

			<div className="flex-1 overflow-y-auto max-h-[620px]">
				{content}
			</div>
		</div>
	)
}
