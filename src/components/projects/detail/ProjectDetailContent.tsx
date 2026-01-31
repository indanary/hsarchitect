import {useEffect, useMemo, useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import DetailInformation from "./Detailinformation"
import ProjectCarousel from "./ProjectCarousel"

type ApiImage = {
	id: number | string
	file_path: string
	file_url: string | null
	alt: string | null
	sort_order: number | null
	thumb_url?: string | null
}

type ApiMedia = {
	id: number | string
	type: "image" | "video"
	url: string | null
	thumb_url?: string | null
	alt?: string | null
	sort_order?: number | null
}

type ApiProject = {
	id: number | string
	title: string
	description?: string | null
	location?: string | null
	project_type_id?: number | string | null
	project_type?: string | null
	scope?: string | null
	year?: number | string | null
	status?: string | null
	area?: number | string | null

	// legacy
	images?: ApiImage[]

	// new
	media?: ApiMedia[]
}

export default function ProjectDetailContent({
	id,
	initialProject = null,
}: {
	id: string
	initialProject?: ApiProject | null
}) {
	const [project, setProject] = useState<ApiProject | null>(initialProject)
	const [loading, setLoading] = useState(!initialProject)
	const [error, setError] = useState<string | null>(null)

	const url = useMemo(
		() =>
			`${
				import.meta.env.PUBLIC_API_BASE_URL
			}/projects/public/${encodeURIComponent(id)}`,
		[id],
	)

	useEffect(() => {
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

	/* -------------------------------------------
	 * 🔑 BUILD CAROUSEL ITEMS (MEDIA FIRST)
	 * ----------------------------------------- */
	const carouselItems =
		project?.media && project.media.length > 0
			? project.media.map((m) => ({
					type: m.type,
					url: m.url!,
					thumb: m.thumb_url ?? undefined,
					alt: m.alt ?? project.title,
			  }))
			: (project?.images ?? []).map((img) => ({
					type: "image" as const,
					url: (img.file_url || img.file_path)!,
					thumb: img.thumb_url ?? undefined,
					alt: img.alt ?? project?.title ?? "",
			  }))

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
						carouselItems.length
							? carouselItems
							: ["/images/project-example.png"]
					}
					wrapperClass="xl:pl-10 overflow-hidden mt-16 xl:mt-21 hidden sm:block"
					size="xl:w-[840px] h-[420px] xl:h-[560px] 2xl:h-[840px]"
				/>
			}
		/>
	)
}
