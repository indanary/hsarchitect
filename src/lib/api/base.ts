const BASE = import.meta.env.API_BASE_URL
const TOKEN = import.meta.env.API_TOKEN

export async function apiFetch<T>(
	path: string,
	init?: RequestInit,
): Promise<T> {
	const res = await fetch(`${BASE}${path}`, {
		...init,
		headers: {
			...(init?.headers ?? {}),
			Authorization: `Bearer ${TOKEN}`,
		},
		cache: "no-store",
	})

	if (!res.ok) throw new Error(`API ${path} failed with ${res.status}`)
	return res.json() as Promise<T>
}
