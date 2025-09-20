import type {APIRoute} from "astro"
import {getStudioSection} from "../../../lib/api/studio"

export const GET: APIRoute = async ({params}) => {
	try {
		const typeParam = String(params.type || "").toLowerCase()
		if (!["profile", "philosophy", "achievement"].includes(typeParam)) {
			return new Response(JSON.stringify({error: "invalid type"}), {
				status: 400,
				headers: {"content-type": "application/json; charset=utf-8"},
			})
		}

		const data = await getStudioSection(
			typeParam as "profile" | "philosophy" | "achievement",
		)

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control":
					"public, s-maxage=300, stale-while-revalidate=1800, max-age=60",
			},
		})
	} catch (e: any) {
		return new Response(JSON.stringify({error: e?.message ?? "error"}), {
			status: 500,
			headers: {"content-type": "application/json; charset=utf-8"},
		})
	}
}
