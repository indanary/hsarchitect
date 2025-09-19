// src/pages/api/project-types.json.ts
import type {APIRoute} from "astro"
import {getProjectTypesPublic} from "../../lib/api/projectTypes"

export const GET: APIRoute = async () => {
	try {
		const data = await getProjectTypesPublic()
		return new Response(JSON.stringify(data), {
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control":
					"public, s-maxage=300, stale-while-revalidate=1800, max-age=60",
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
