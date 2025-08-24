import ProjectCarousel from "./ProjectCarousel"

interface Project {
	id: number
	title: string
	description: string
	images: string[]
}

export default function DetailInformation() {
	const images = [
		"/images/project-example.png",
		"/images/project-example.png",
		"/images/project-example.png",
	]

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
						<span>Commercial</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Scope</span>
						<span>Architecture Interior</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Year</span>
						<span>2025</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Status</span>
						<span>Build</span>
					</div>

					<div className="flex flex-col text-xs-loose text-[#071E50]">
						<span className="font-bold">Area</span>
						<span>200 Sqm</span>
					</div>
				</div>

				{/* right side */}
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold text-[#071E50]">
						Bharga Bistro
					</h1>

					<span className="text-xs-loose text-[#071E50]">
						Lorem ipsum dolor sit amet, consectetuer adipiscing
						elit, sed diam nonummy nibh euismod tincidunt ut laoreet
						dolore magna aliquam erat volutpat. Ut wisi enim ad
						minim veniam, quis nostrud exerci tation ullamcorper
						suscipit lobortis nisl ut aliquip ex ea commodo
						consequat.
						<br />
						<br />
						Duis autem vel eum iriure dolor in hendrerit in
						vulputate velit esse molestie consequat, vel illum
						dolore eu feugiat nulla facilisis at vero eros et
						accumsan et iusto odio dignissim qui blandit praesent
						luptatum zzril delenit augue duis dolore te feugait
						nulla facilisi. feugiat nulla facilisis at vero eros et
						accumsan et iusto odio dignissim qui blandit praesent
						luptatum zzril delenit augue duis dolore te feugait
						nulla facilisi.
					</span>
				</div>
			</div>

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
						Bharga Bistro
					</h1>

					<div></div>
				</div>

				<ProjectCarousel images={images} size="aspect-[800/540]" />

				<div className="w-full flex justify-between gap-10">
					{/* Left Side */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col text-xs-loose text-[#071E50]">
							<span className="font-bold">Category</span>
							<span>Commercial</span>
						</div>

						<div className="flex flex-col text-xs-loose text-[#071E50]">
							<span className="font-bold">Scope</span>
							<span>Architecture Interior</span>
						</div>

						<div className="flex flex-col text-xs-loose text-[#071E50]">
							<span className="font-bold">Year</span>
							<span>2025</span>
						</div>

						<div className="flex flex-col text-xs-loose text-[#071E50]">
							<span className="font-bold">Status</span>
							<span>Build</span>
						</div>

						<div className="flex flex-col text-xs-loose text-[#071E50]">
							<span className="font-bold">Area</span>
							<span>200 Sqm</span>
						</div>
					</div>

					{/* right side */}
					<div className="flex flex-col gap-4">
						<span className="text-xs-loose text-[#071E50]">
							Lorem ipsum dolor sit amet, consectetuer adipiscing
							elit, sed diam nonummy nibh euismod tincidunt ut
							laoreet dolore magna aliquam erat volutpat. Ut wisi
							enim ad minim veniam, quis nostrud exerci tation
							ullamcorper suscipit lobortis nisl ut aliquip ex ea
							commodo consequat.
							<br />
							<br />
							Duis autem vel eum iriure dolor in hendrerit in
							vulputate velit esse molestie consequat, vel illum
							dolore eu feugiat nulla facilisis at vero eros et
							accumsan et iusto odio dignissim qui blandit
							praesent luptatum zzril delenit augue duis dolore te
							feugait nulla facilisi. feugiat nulla facilisis at
							vero eros et accumsan et iusto odio dignissim qui
							blandit praesent luptatum zzril delenit augue duis
							dolore te feugait nulla facilisi.
						</span>
					</div>
				</div>
			</div>
		</>
	)
}
