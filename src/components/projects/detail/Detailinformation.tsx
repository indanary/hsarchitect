interface Project {
	id: number
	title: string
	imageUrl: string
	description: string
}

export default function DetailInformation({project}: {project: Project}) {
	return (
		<div className="w-full flex justify-between gap-14">
			{/* Left Side */}
			<div className="flex flex-col gap-8">
				<a
					href="/projects"
				>
					<img
						src="/images/back-icon.svg"
						alt="Back"
						height="auto"
						loading="lazy"
						decoding="async"
						className="cursor-pointer h-auto object-contain w-[20px] mt-2"
					/>
				</a>

				<div className="flex flex-col gap-2 text-xs">
					<span className="font-bold">Category</span>
					<span>Commercial</span>
				</div>

				<div className="flex flex-col gap-2 text-xs">
					<span className="font-bold">Scope</span>
					<span>Architecture Interior</span>
				</div>

				<div className="flex flex-col gap-2 text-xs">
					<span className="font-bold">Year</span>
					<span>2025</span>
				</div>

				<div className="flex flex-col gap-2 text-xs">
					<span className="font-bold">Status</span>
					<span>Build</span>
				</div>

				<div className="flex flex-col gap-2 text-xs">
					<span className="font-bold">Area</span>
					<span>200 Sqm</span>
				</div>
			</div>

			{/* right side */}
			<div className="flex flex-col gap-6.5">
				<h1 className="text-2xl font-semibold">Bharga Bistro</h1>

				<span className="text-xs">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
					sed diam nonummy nibh euismod tincidunt ut laoreet dolore
					magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
					quis nostrud exerci tation ullamcorper suscipit lobortis
					nisl ut aliquip ex ea commodo consequat.
					<br />
					<br />
					Duis autem vel eum iriure dolor in hendrerit in vulputate
					velit esse molestie consequat, vel illum dolore eu feugiat
					nulla facilisis at vero eros et accumsan et iusto odio
					dignissim qui blandit praesent luptatum zzril delenit augue
					duis dolore te feugait nulla facilisi. feugiat nulla
					facilisis at vero eros et accumsan et iusto odio dignissim
					qui blandit praesent luptatum zzril delenit augue duis
					dolore te feugait nulla facilisi.
				</span>
			</div>
		</div>
	)
}
