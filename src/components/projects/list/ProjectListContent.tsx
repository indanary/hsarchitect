// src/components/projects/list/ProjectListContent.tsx
import {useEffect, useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import SelectCategory from "./SelectCategory"
import ProjectGallery from "./ProjectGallery"

type ProjectType = {id: number | string; project_type: string}

interface Props {
	categories: ProjectType[]
}

export default function ProjectListContent({
	categories: initialCategories,
}: Readonly<Props>) {
	const [typeId, setTypeId] = useState<string | null>(null) // null = All
	const [categories, setCategories] = useState<ProjectType[]>(
		initialCategories ?? [],
	)

	// Fallback: if build-time categories are empty, fetch on client
	useEffect(() => {
		if (initialCategories && initialCategories.length > 0) return

		const base = import.meta.env.PUBLIC_API_BASE_URL
		if (!base) {
			console.warn(
				"[ProjectListContent] PUBLIC_API_BASE_URL is not set on client.",
			)
			return
		}

		let cancelled = false
		const ctrl = new AbortController()

		;(async () => {
			try {
				const url = `${base}/project-types/public`
				const r = await fetch(url, {
					cache: "no-store",
					signal: ctrl.signal,
				})
				if (!r.ok) {
					console.warn(
						"[ProjectListContent] client fetch categories failed:",
						r.status,
						r.statusText,
					)
					return
				}
				const data = (await r.json()) as ProjectType[]
				if (!cancelled) {
					setCategories(data)
				}
			} catch (err) {
				if (!cancelled) {
					console.warn(
						"[ProjectListContent] client fetch categories error:",
						err,
					)
				}
			}
		})()

		return () => {
			cancelled = true
			ctrl.abort()
		}
	}, [initialCategories])

	return (
		<LayoutWrapper
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
			content={<ProjectGallery projectTypeId={typeId} />}
		/>
	)
}
