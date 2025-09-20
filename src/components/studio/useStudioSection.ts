import {useEffect, useMemo, useState} from "react"

export type StudioType = "profile" | "philosophy" | "achievement"
export interface StudioEntry {
	id: number | string
	type: StudioType
	description: string // HTML
}

export function useStudioSection(type: StudioType) {
	const [data, setData] = useState<StudioEntry | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const url = useMemo(() => `/api/studio/${type}.json`, [type])

	useEffect(() => {
		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal})
			.then(async (r) => {
				if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
				return (await r.json()) as StudioEntry
			})
			.then((json) => {
				if (!cancelled) setData(json)
			})
			.catch((e) => {
				if (!cancelled) setError(e.message || "Failed to load")
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
			ctrl.abort()
		}
	}, [url])

	return {data, loading, error}
}
