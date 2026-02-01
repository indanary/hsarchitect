// src/components/projects/detail/DetailInformationMobile.tsx
import {useMemo} from "react"
import ProjectCarousel from "./ProjectCarousel"

type ApiImage = {
	id: number | string
	file_path: string
	file_url: string | null
	alt: string | null
	sort_order: number | null
}

type ApiMedia = {
	id: number | string
	type: "image" | "video"
	url: string | null
	thumb_url?: string | null
	alt?: string | null
	sort_order?: number | null
}

type ApiProject = {
	id: number | string
	title: string
	description?: string | null
	location?: string | null
	project_type_id?: number | string | null
	project_type?: string | null
	scope?: string | null
	year?: number | string | null
	status?: string | null
	area?: number | string | null

	// legacy
	images?: ApiImage[]

	// unified
	media?: ApiMedia[]
}

export default function DetailInformationMobile({
	project,
}: {
	project?: ApiProject
}) {
	/* ------------------------------------------------
	 * 🔑 BUILD CAROUSEL ITEMS (MEDIA FIRST, SAFE FALLBACK)
	 * ----------------------------------------------- */
	const carouselItems = useMemo(() => {
		// ✅ Use unified media if available
		if (project?.media && project.media.length > 0) {
			return project.media
				.map((m) => ({
					type: m.type,
					url: m.url!,
					thumb: m.thumb_url ?? undefined,
					alt: m.alt ?? project.title,
				}))
				.filter((m) => m.url)
		}

		// ✅ Fallback to legacy images
		return (project?.images ?? [])
			.map((img) => ({
				type: "image" as const,
				url: img.file_url || img.file_path,
				alt: img.alt ?? project?.title,
			}))
			.filter((m) => m.url)
	}, [project])

	const title = project?.title ?? ""
	const scope = project?.scope ?? "-"
	const year = project?.year ?? "-"
	const status = project?.status ?? "-"
	const area = project?.area ?? "-"
	const project_type = project?.project_type ?? "-"

	return (
		<div className="w-full flex flex-col sm:hidden gap-6">
			{/* Back + Title */}
			<div className="flex items-center justify-between">
				<a href="/projects">
					<img
						src="/images/back-icon.svg"
						alt="Back"
						width={16}
						className="cursor-pointer object-contain"
					/>
				</a>

				<h1 className="text-[22px] font-bold text-[#071E50]">
					{title}
				</h1>

				<div />
			</div>

			{/* ✅ Carousel */}
			<ProjectCarousel
				images={
					carouselItems.length
						? carouselItems
						: ["/images/project-example.png"]
				}
				size="aspect-[800/540]"
			/>

			<div className="w-full flex justify-between gap-8">
				{/* Left */}
				<div className="flex flex-col gap-4 min-w-0">
					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Category</span>
						<span>{String(project_type)}</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Scope</span>
						<span>{scope}</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Year</span>
						<span>{String(year)}</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Status</span>
						<span>{status}</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Area</span>
						<span>{String(area)}</span>
					</div>
				</div>

				{/* Right */}
				<div className="flex flex-col gap-4 w-full min-w-0">
					{project?.description ? (
						<div
							className="text-xs-loose text-[#071E50]
								break-words whitespace-normal
								[&_img]:max-w-full [&_img]:h-auto
								[&_iframe]:max-w-full
								[&_table]:table-fixed"
							dangerouslySetInnerHTML={{
								__html: project.description,
							}}
						/>
					) : (
						<span className="text-xs-loose text-[#071E50]">—</span>
					)}
				</div>
			</div>
		</div>
	)
}
