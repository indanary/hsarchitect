import {useEffect, useMemo, useState} from "react"

type StudioEntry = {
	id: number | string
	type: "profile" | "philosophy" | "achievement"
	description: string
}

export default function AchievementSection() {
	const [data, setData] = useState<StudioEntry | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const url = useMemo(() => `/api/studio/achievement.json`, [])

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

	if (loading)
		return (
			<div className="h-[400px] w-[652px] mt-19 text-white/80">
				Loading…
			</div>
		)
	if (error)
		return (
			<div className="h-[400px] w-[652px] mt-19 text-red-400">
				Failed: {error}
			</div>
		)

	return (
		<div className="h-[400px] w-[652px] mt-19">
			<div
				className="text-xs-loose text-white"
				dangerouslySetInnerHTML={{__html: data?.description ?? ""}}
			/>
		</div>
	)
}
