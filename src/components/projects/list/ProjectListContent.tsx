// src/components/projects/list/ProjectListContent.tsx
import {useEffect, useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import SelectCategory from "./SelectCategory"
import ProjectGallery from "./ProjectGallery"

type ProjectType = {id: number | string; project_type: string}

type ApiProject = {
	id: number | string
	title: string
	location?: string
	cover_url?: string | null
	media?: {
		type: "image" | "video"
		url?: string | null
		thumb_url?: string | null
		sort_order?: number
	}[]
}

interface Props {
	categories: ProjectType[]
	initialProjects: ApiProject[]
}

export default function ProjectListContent({
	categories: initialCategories,
	initialProjects,
}: Readonly<Props>) {
	const [typeId, setTypeId] = useState<string | null>(null) // null = All
	const [categories, setCategories] = useState<ProjectType[]>(
		initialCategories ?? [],
	)
	const [isScrolled, setIsScrolled] = useState(false)

	// Fallback: if build-time categories are empty, fetch on client
	useEffect(() => {
		if (initialCategories && initialCategories.length > 0) return

		const base = import.meta.env.PUBLIC_API_BASE_URL

		let cancelled = false
		const ctrl = new AbortController()

		;(async () => {
			try {
				const url = `${base}/project-types/public`
				const r = await fetch(url, {
					cache: "no-store",
					signal: ctrl.signal,
				})

				const data = (await r.json()) as ProjectType[]
				if (!cancelled) {
					setCategories(data)
				}
			} catch (err) {}
		})()

		return () => {
			cancelled = true
			ctrl.abort()
		}
	}, [initialCategories])

	return (
		<LayoutWrapper
			contentVariant="full-height"
			isContentScrolled={isScrolled}
			sidebar={
				<div className="flex gap-10 text-white" slot="sidebar">
					<span className="text-xs-loose font-semibold whitespace-nowrap">
						Project Type
					</span>
					<SelectCategory
						categories={categories}
						onSelect={setTypeId}
					/>
				</div>
			}
			content={
				<ProjectGallery
					projectTypeId={typeId}
					initialProjects={initialProjects}
					onScrollStateChange={setIsScrolled}
				/>
			}
		/>
	)
}
