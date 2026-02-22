// src/components/studio/StudioSection.tsx
import {useEffect, useMemo, useState} from "react"
import type {StudioEntry} from "./StudioContent"

// main.tsx or layout.tsx
import "ckeditor5/ckeditor5.css"

interface Props {
	endpoint: "/studio/profile" | "/studio/philosophy" | "/studio/achievement"
	initialData?: StudioEntry | null
	className?: string // optional: tweak layout for mobile/desktop
}

function normalizeImages(html: string) {
	const containerWidth = 1100

	return html.replace(
		/<img([^>]*?)style="[^"]*width:\s*([\d.]+)%[^"]*"([^>]*)>/gi,
		(_, before, percent, after) => {
			const px = Math.round((parseFloat(percent) / 100) * containerWidth)

			return `<img${before}style="width:${px}px"${after}>`
		},
	)
}

export default function StudioSection({
	endpoint,
	initialData,
	className,
}: Readonly<Props>) {
	const [data, setData] = useState<StudioEntry | null>(initialData ?? null)
	const [loading, setLoading] = useState(!initialData)
	const [error, setError] = useState<string | null>(null)

	const url = useMemo(() => {
		const base = import.meta.env.PUBLIC_API_BASE_URL
		if (!base) return null
		return `${base}${endpoint}`
	}, [endpoint])

	useEffect(() => {
		// if we already have build-time data, no need to fetch again
		if (initialData) return
		if (!url) {
			return
		}

		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal, cache: "no-store"})
			.then(async (r) => {
				if (!r.ok) {
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
	}, [url, initialData])

	if (loading) {
		return (
			<div
				className={
					className ??
					"h-[400px] w-[652px] mt-13 xl:mt-19 text-white/80"
				}
			>
				Loading…
			</div>
		)
	}

	if (error) {
		return (
			<div
				className={
					className ??
					"h-[400px] w-[652px] mt-13 xl:mt-19 text-red-400"
				}
			>
				Failed: {error}
			</div>
		)
	}

	return (
		<div className={className ?? "h-[400px] w-[652px] mt-13 xl:mt-19"}>
			<div
				className="ck-content text-white"
				dangerouslySetInnerHTML={{
					__html: normalizeImages(data?.data?.description ?? ""),
				}}
			/>
		</div>
	)
}
