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

export default function ProjectDetailContent({id}: {id: string}) {
	const [project, setProject] = useState<ApiProject | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const url = useMemo(
		() => `/api/projects/${encodeURIComponent(id)}.json`,
		[id],
	)

	useEffect(() => {
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
	}, [url])

	const images: string[] = (project?.images ?? [])
		.map((img) => img.file_url || img.file_path)
		.filter(Boolean) as string[]

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
					size="xl:w-[840px] h-[432px] xl:h-[540px]"
				/>
			}
		/>
	)
}
