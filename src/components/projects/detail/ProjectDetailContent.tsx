// src/components/projects/detail/ProjectDetailContent.tsx
import {useEffect, useMemo, useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import DetailInformation from "./Detailinformation"
import ProjectCarousel from "./ProjectCarousel"

type ApiImage = {
	id: number | string
	file_path: string
	file_url: string | null // absolute URL from backend
	alt: string | null
	sort_order: number | null
	// optional (if your API returns it)
	thumb_url?: string | null
}

type ApiProject = {
	id: number | string
	title: string
	description?: string | null // HTML string
	location?: string | null
	project_type_id?: number | string | null
	scope?: string | null
	year?: number | string | null
	status?: string | null
	area?: number | string | null
	images: ApiImage[]
}

export default function ProjectDetailContent({
	id,
	initialProject = null, // <-- optional build-time data
}: {
	id: string
	initialProject?: ApiProject | null
}) {
	const [project, setProject] = useState<ApiProject | null>(initialProject)
	const [loading, setLoading] = useState(!initialProject)
	const [error, setError] = useState<string | null>(null)

	// call your backend directly (no Astro /api proxy)
	const url = useMemo(
		() =>
			`${
				import.meta.env.PUBLIC_API_BASE_URL
			}/projects/public/${encodeURIComponent(id)}`,
		[id],
	)

	useEffect(() => {
		// If we already have build-time data, skip client fetch
		if (initialProject) return

		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal})
			.then(async (r) => {
				if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
				return (await r.json()) as ApiProject
			})
			.then((data) => {
				if (!cancelled) setProject(data)
			})
			.catch((e) => {
				if (!cancelled) setError(e.message || "Failed to load project")
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
			ctrl.abort()
		}
	}, [url, initialProject])

	// Prefer thumb if present; fall back to main URL
	const images =
		(project?.images ?? [])
			.map((img) => ({
				url: (img.file_url || img.file_path) as string,
				thumb: img.thumb_url || undefined,
				alt: img.alt ?? project?.title ?? "",
			}))
			// keep strings for backward compatibility with your ProjectCarousel
			.map((it) => it.thumb ?? it.url) || []

	if (loading) {
		return (
			<LayoutWrapper
				showSearch
				theme="light"
				sidebar={<DetailInformation loading />}
				content={
					<div className="mt-16 text-appNeutral-800">
						Loading project…
					</div>
				}
			/>
		)
	}

	if (error || !project) {
		return (
			<LayoutWrapper
				showSearch
				theme="light"
				sidebar={<DetailInformation error={error ?? "Not found"} />}
				content={
					<div className="mt-16 text-red-600">
						Failed: {error ?? "Not found"}
					</div>
				}
			/>
		)
	}

	return (
		<LayoutWrapper
			showSearch
			theme="light"
			sidebar={<DetailInformation project={project} />}
			content={
				<ProjectCarousel
					images={
						images.length ? images : ["/images/project-example.png"]
					}
					wrapperClass="xl:pl-10 overflow-hidden mt-16 xl:mt-21 hidden sm:block"
					size="xl:w-[840px] h-[420px] xl:h-[560px] 2xl:h-[840px]"
				/>
			}
		/>
	)
}
