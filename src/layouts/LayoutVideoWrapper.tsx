import {useEffect, useState, type ReactNode} from "react"

interface LayoutVideoWrapperProps {
	sidebar?: ReactNode
	sidebarClass?: string
	content?: ReactNode
	theme?: "dark" | "light"
	showSearch?: boolean
	videoSrc?: string
}

function useIsXL() {
	const [isXL, setIsXL] = useState(false)

	useEffect(() => {
		const check = () => setIsXL(window.innerWidth >= 1280)
		check()
		window.addEventListener("resize", check)
		return () => window.removeEventListener("resize", check)
	}, [])

	return isXL
}

export default function LayoutVideoWrapper({
	sidebar,
	sidebarClass = "",
	content,
	theme = "dark",
	showSearch = false,
	videoSrc,
}: Readonly<LayoutVideoWrapperProps>) {
	const [path, setPath] = useState("/")
	const [isOpen, setIsOpen] = useState(false)

	const isXL = useIsXL()

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname)
		}
	}, [])

	const isActive = (href: string) => path.startsWith(href)

	const bgClass =
		theme === "dark"
			? "bg-transparent text-white"
			: "bg-transparent text-black"

	return (
		<>
			{/* ======= BACKGROUND VIDEO (NEW) ======= */}
			<video
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				poster="/images/home-video-poster.jpg"
				className="fixed top-0 left-0 w-full h-full object-cover -z-10 animate-fade-in"
			>
				<source src={videoSrc} type="video/mp4" />
			</video>

			{/* Dark overlay (NEW) */}
			<div className="fixed inset-0 bg-black/30 -z-10" />

			{/* ======= YOUR ORIGINAL LAYOUT (UNCHANGED STRUCTURE) ======= */}
			<div
				className={`w-full min-h-screen sm:h-screen flex flex-col sm:flex-row p-6 sm:p-9 ${bgClass} ${
					isOpen ? "fixed" : "relative"
				}`}
			>
				<aside className="flex flex-col h-full min-h-0 w-full sm:w-[24rem]">
					<div className="w-full flex justify-between items-center">
						<a href="/">
							<img
								src={
									theme === "dark"
										? "/images/hsarchitect-logo-light.png"
										: "/images/hsarchitect-logo-dark.png"
								}
								alt="HS Architect Logo"
								height="auto"
								className="w-[132px] sm:w-[144px] h-auto object-contain"
								loading="eager"
								decoding="async"
								fetchPriority="high"
							/>
						</a>

						{/* hamburger menu */}
						<button
							className="flex flex-col justify-center items-center gap-[9px] w-[22px] h-[22px] sm:hidden"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
						>
							<span
								className={`block h-[1.5px] w-full transition-transform duration-300 ${
									isOpen
										? "rotate-45 translate-y-[5.25px]"
										: ""
								} ${
									theme === "dark"
										? "bg-white"
										: "bg-[#071E50]"
								}`}
							/>
							<span
								className={`block h-[1.5px] w-full transition-transform duration-300 ${
									isOpen
										? "-rotate-45 -translate-y-[5.25px]"
										: ""
								} ${
									theme === "dark"
										? "bg-white"
										: "bg-[#071E50]"
								}`}
							/>
						</button>
					</div>

					{/* floating mobile menu */}
					<div
						className={`sm:hidden fixed top-[80px] left-0 w-full z-50 transition-all duration-300 ease-in-out transform origin-top ${
							isOpen
								? "h-[calc(100vh-80px)] opacity-100 scale-y-100 overflow-auto"
								: "h-0 opacity-0 scale-y-95 pointer-events-none overflow-hidden"
						}`}
					>
						<nav
							className={`h-full flex flex-col gap-2 py-4 px-6 ${
								theme === "dark"
									? "bg-[#071E50] text-white"
									: "bg-white text-[#071E50]"
							}`}
							role="navigation"
							aria-label="Mobile navigation"
						>
							{[
								{label: "Projects", href: "/projects"},
								{label: "Studio", href: "/studio"},
								{label: "Contact", href: "/contact"},
								{label: "Search", href: "/search"},
							].map(({label, href}) => (
								<a
									key={href}
									href={href}
									className={`hover:opacity-80 transition-colors text-xs-loose w-fit ${
										isActive(href) ? "font-bold" : ""
									}`}
								>
									{label}
								</a>
							))}
						</nav>
					</div>

					{isXL ? (
						<div
							className={`flex-1 overflow-auto pr-5 py-10 lg:py-4 xl:py-10 app-scroll ${sidebarClass}`}
						>
							{sidebar}
						</div>
					) : (
						<div
							className="overflow-auto pr-5 app-scroll"
							style={{
								height: "calc(100% - 50px)",
								marginTop: "25px",
								marginBottom: "25px",
							}}
						>
							{sidebar}
						</div>
					)}

					<nav
						className={`sm:flex items-center gap-16 hidden pt-2 text-white`}
						role="navigation"
						aria-label="Main navigation"
					>
						{[
							{label: "Projects", href: "/projects"},
							{label: "Studio", href: "/studio"},
							{label: "Contact", href: "/contact"},
						].map(({label, href}) => (
							<a
								key={href}
								href={href}
								className={`hover:opacity-80 transition-colors text-xs-loose ${
									isActive(href) ? "font-bold" : ""
								}`}
							>
								{label}
							</a>
						))}
					</nav>
				</aside>

				{content && (
					<main className="flex-1 overflow-hidden pl-0 sm:pl-6 xl:pl-12">
						{content}
					</main>
				)}

				{showSearch && (
					<a
						href="/search"
						className={`fixed bottom-9 right-12 z-50 hover:opacity-80 transition-colors text-xs-loose hidden sm:block ${
							isActive("/search") ? "font-bold" : ""
						} ${
							theme === "dark" ? "text-white" : "text-[#071E50]"
						}`}
					>
						Search.........
					</a>
				)}
			</div>
		</>
	)
}
