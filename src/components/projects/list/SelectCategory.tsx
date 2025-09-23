// src/components/projects/list/SelectCategory.tsx
import {useEffect, useMemo, useState} from "react"

interface Props {
	onSelect?: (typeId: string | null) => void // null = All
}

type ProjectType = {id: number | string; project_type: string}

export default function SelectCategory({onSelect}: Readonly<Props>) {
	const [categories, setCategories] = useState<ProjectType[]>([])
	const [selectedId, setSelectedId] = useState<string>("all")
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Call your backend directly (static hosting friendly)
	const url = useMemo(
		() => `${import.meta.env.PUBLIC_API_BASE_URL}/project-types/public`,
		[],
	)

	useEffect(() => {
		let cancelled = false
		const ctrl = new AbortController()

		setLoading(true)
		setError(null)

		fetch(url, {signal: ctrl.signal, cache: "no-store"})
			.then(async (r) => {
				if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
				return (await r.json()) as ProjectType[]
			})
			.then((data) => {
				if (!cancelled) setCategories(data)
			})
			.catch((e) => {
				if (!cancelled)
					setError(e.message || "Failed to load categories")
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
			ctrl.abort()
		}
	}, [url])

	if (loading) return <span className="text-white">Loading categories…</span>
	if (error) return <span className="text-red-400">Failed: {error}</span>

	const allOption = {id: "all", project_type: "All"}
	const options = [allOption, ...categories]

	return (
		<div className="flex flex-row flex-wrap sm:flex-col gap-3 text-white font-normal">
			{options.map((opt) => {
				const id = String(opt.id)
				const isSelected = selectedId === id
				return (
					<span
						key={id}
						className="cursor-pointer text-xs-loose"
						onClick={() => {
							setSelectedId(id)
							onSelect?.(id === "all" ? null : id)
						}}
						aria-current={isSelected ? "true" : undefined}
					>
						<span
							className={`inline-block border-b-2 transition-all duration-300 ${
								isSelected
									? "border-white font-bold"
									: "border-transparent hover:border-white/40"
							}`}
						>
							{opt.project_type}
						</span>
					</span>
				)
			})}
		</div>
	)
}
