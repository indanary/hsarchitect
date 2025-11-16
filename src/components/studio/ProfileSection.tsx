// src/components/studio/ProfileSection.tsx
import {useEffect, useMemo, useState} from "react"

type StudioEntry = {
	id: number | string
	type: "profile" | "philosophy" | "achievement"
	description: string // HTML from backend
}

export default function ProfileSection() {
	const [data, setData] = useState<StudioEntry | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Call your backend directly
	const url = useMemo(
		() => `${import.meta.env.PUBLIC_API_BASE_URL}/studio/profile`,
		[],
	)

	useEffect(() => {
		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal, cache: "no-store"})
			.then(async (r) => {
				if (!r.ok) {
					// Try to get a helpful message from body
					const ct = r.headers.get("content-type") || ""
					const body = await r.text()
					throw new Error(
						`HTTP ${r.status} ${
							r.statusText
						} — content-type: ${ct} — body: ${body.slice(0, 500)}`,
					)
				}

				const ct = r.headers.get("content-type") || ""
				if (!ct.includes("application/json")) {
					// Received HTML or something else — read it and throw
					const text = await r.text()
					throw new Error(
						`Expected JSON but received: ${ct}; body: ${text.slice(
							0,
							500,
						)}`,
					)
				}

				return r.json() as Promise<StudioEntry>
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

	if (loading) {
		return (
			<div className="h-[400px] w-[652px] mt-19 text-white/80">
				Loading…
			</div>
		)
	}

	if (error) {
		return (
			<div className="h-[400px] w-[652px] mt-19 text-red-400">
				Failed: {error}
			</div>
		)
	}

	return (
		<div className="h-[400px] w-[652px] mt-19">
			<div
				className="text-xs-loose text-white"
				// Ensure the backend returns trusted/sanitized HTML.
				dangerouslySetInnerHTML={{__html: data?.description ?? ""}}
			/>
		</div>
	)
}
