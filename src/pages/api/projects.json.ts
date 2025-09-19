import type {APIRoute} from "astro"
import {getProjects} from "../../lib/api/projects"

export const GET: APIRoute = async ({url}) => {
	try {
		const typeId = url.searchParams.get("project_type_id") ?? undefined
		// Pass through as project_type_id (or convert to your backend’s param name)
		const data = await getProjects(
			typeId ? {project_type_id: typeId} : undefined,
		)

		return new Response(JSON.stringify(data), {
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control":
					"public, s-maxage=60, stale-while-revalidate=600, max-age=30",
			},
			status: 200,
		})
	} catch (e: any) {
		return new Response(JSON.stringify({error: e?.message ?? "error"}), {
			headers: {"content-type": "application/json; charset=utf-8"},
			status: 500,
		})
	}
}
