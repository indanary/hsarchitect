import ProjectCarousel from "./ProjectCarousel"
import {useMemo} from "react"

type ApiImage = {
	id: number | string
	file_path: string
	file_url: string | null
	alt: string | null
	sort_order: number | null
}

type ApiProject = {
	id: number | string
	title: string
	description?: string | null // HTML
	location?: string | null
	project_type_id?: number | string | null
	scope?: string | null
	year?: number | string | null
	status?: string | null
	area?: number | string | null
	images: ApiImage[]
}

export default function DetailInformation(props: {
	project?: ApiProject
	loading?: boolean
	error?: string | null
}) {
	const {project, loading, error} = props

	const images: string[] = useMemo(
		() =>
			(project?.images ?? [])
				.map((img) => img.file_url || img.file_path)
				.filter(Boolean) as string[],
		[project],
	)

	const title = project?.title ?? ""
	const category = project?.project_type_id ?? "-" // replace with a name map if you have one
	const scope = project?.scope ?? "-"
	const year = project?.year ?? "-"
	const status = project?.status ?? "-"
	const area = project?.area ?? "-"

	if (loading) {
		return (
			<>
				<div className="w-full hidden sm:flex justify-between gap-12 pr-8 xl:pr-0">
					<div className="flex flex-col gap-6">
						<div className="h-5 w-24 bg-gray-200 rounded" />
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex flex-col gap-1">
								<div className="h-3 w-16 bg-gray-200 rounded" />
								<div className="h-3 w-28 bg-gray-100 rounded" />
							</div>
						))}
					</div>
					<div className="flex-1">
						<div className="h-6 w-48 bg-gray-200 rounded mb-3" />
						<div className="h-24 w-full bg-gray-100 rounded" />
					</div>
				</div>

				<div className="w-full flex flex-col sm:hidden gap-6">
					<div className="flex items-center justify-between">
						<div className="h-5 w-16 bg-gray-200 rounded" />
						<div className="h-6 w-40 bg-gray-200 rounded" />
						<div />
					</div>
					<div className="h-40 w-full bg-gray-100 rounded" />
				</div>
			</>
		)
	}

	if (error) {
		return <div className="text-red-600">{error}</div>
	}

	return (
		<>
			<div className="w-full hidden sm:flex justify-between gap-12 pr-8 xl:pr-0">
				{/* Left Side */}
				<div className="flex flex-col gap-6">
					<a href="/projects">
						<img
							src="/images/back-icon.svg"
							alt="Back"
							height="auto"
							loading="lazy"
							decoding="async"
							className="cursor-pointer h-auto object-contain w-[20px] mt-2"
						/>
					</a>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Category</span>
						<span>{String(category)}</span>
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

				{/* right side */}
				<div className="flex flex-col gap-4 max-w-prose">
					<h1 className="text-2xl font-bold text-[#071E50]">
						{title}
					</h1>

					{/* Description is HTML from API */}
					{project?.description ? (
						<div
							className="text-xs-loose text-[#071E50]"
							dangerouslySetInnerHTML={{
								__html: project.description,
							}}
						/>
					) : (
						<span className="text-xs-loose text-[#071E50]">—</span>
					)}
				</div>
			</div>

			{/* Mobile layout (with carousel) */}
			<div className="w-full flex flex-col sm:hidden gap-6">
				{/* back btn & title */}
				<div className="flex items-center justify-between">
					<a href="/projects">
						<img
							src="/images/back-icon.svg"
							alt="Back"
							width={16}
							height="auto"
							loading="lazy"
							decoding="async"
							className="cursor-pointer h-auto object-contain"
						/>
					</a>

					<h1 className="text-[22px] font-bold text-[#071E50]">
						{title}
					</h1>

					<div></div>
				</div>

				<ProjectCarousel
					images={
						images.length ? images : ["/images/project-example.png"]
					}
					size="aspect-[800/540]"
				/>

				<div className="w-full flex justify-between gap-10">
					{/* Left Side */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col text-xs-loose text-[#071E50]">
							<span className="font-bold">Category</span>
							<span>{String(category)}</span>
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

					{/* right side */}
					<div className="flex flex-col gap-4">
						{project?.description ? (
							<div
								className="text-xs-loose text-[#071E50]"
								dangerouslySetInnerHTML={{
									__html: project.description,
								}}
							/>
						) : (
							<span className="text-xs-loose text-[#071E50]">
								—
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
