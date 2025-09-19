import type {APIRoute} from "astro"
import {getProject} from "../../../lib/api/projects"

export const GET: APIRoute = async ({params}) => {
	try {
		const id = params.id!
		const data = await getProject(id)

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
