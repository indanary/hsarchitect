import {apiFetch} from "./base"

export interface PublicProject {
	id: string | number
	title: string
	location?: string | null
	project_type_id?: string | number | null
	scope?: string | null
	year?: number | string | null
	status?: string | null
	area?: number | string | null
	cover_image_id?: string | number | null
	cover_file_path?: string | null
	cover_alt?: string | null
	cover_url?: string | null
}

export interface ProjectImage {
	id: string | number
	file_path: string
	file_url: string | null
	alt: string | null
	sort_order: number | null
}

export interface PublicProjectDetail {
	id: string | number
	title: string
	description?: string | null
	location?: string | null
	project_type_id?: string | number | null
	scope?: string | null
	year?: number | string | null
	status?: string | null
	area?: number | string | null
	images: ProjectImage[]
}

/** Public list */
export async function getProjects(params?: {
	project_type_id?: string
	q?: string
}) {
	const sp = new URLSearchParams()
	if (params?.project_type_id)
		sp.set("project_type_id", params.project_type_id)
	if (params?.q) sp.set("q", params.q)
	const qs = sp.toString() ? `?${sp.toString()}` : ""
	return apiFetch<PublicProject[]>(`/projects/public${qs}`)
}

/** Public detail */
export async function getProject(id: string | number) {
	return apiFetch<PublicProjectDetail>(
		`/projects/public/${encodeURIComponent(String(id))}`,
	)
}
