import {useEffect, useState, type ReactNode} from "react"

interface LayoutVideoWrapperProps {
	sidebar?: ReactNode
	sidebarClass?: string
	content?: ReactNode
	theme?: "dark" | "light"
	showSearch?: boolean
	videoSrc?: string
}

/* =========================
   Responsive helpers
========================= */

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

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 640)
		check()
		window.addEventListener("resize", check)
		return () => window.removeEventListener("resize", check)
	}, [])

	return isMobile
}

/* =========================
   Component
========================= */

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
	const [allowVideo, setAllowVideo] = useState(true)

	const isXL = useIsXL()
	const isMobile = useIsMobile()

	/* =========================
	   Path detection
	========================= */
	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname)
		}
	}, [])

	/* =========================
	   Smart video rules
	========================= */
	useEffect(() => {
		if (typeof window === "undefined") return

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches

		const connection = (navigator as any).connection
		const saveData = connection?.saveData === true

		if (prefersReducedMotion || saveData) {
			setAllowVideo(false)
		}
	}, [])

	const isActive = (href: string) => path.startsWith(href)

	const bgClass =
		theme === "dark"
			? "bg-transparent text-white"
			: "bg-transparent text-black"

	/* =========================
	   Video source logic
	========================= */
	const videoSource = isMobile
		? "/videos/home-video-mobile.mp4"
		: "/videos/home-video.mp4"

	return (
		<>
			{/* ========================
			   SMART BACKGROUND VIDEO
			======================== */}
			{allowVideo && (
				<video
					key={videoSource}
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					poster="/images/home-video-poster.jpg"
					controls={false}
					tabIndex={-1}
					disablePictureInPicture
					controlsList="nodownload nofullscreen noplaybackrate"
					className="fixed top-0 left-0 w-full h-full object-cover -z-10 animate-fade-in pointer-events-none select-none"
					ref={(el) => {
						if (!el) return

						/* ===== Force attributes at DOM level ===== */
						el.muted = true
						el.defaultMuted = true
						el.playsInline = true
						el.autoplay = true
						el.loop = true
						el.preload = "auto"
						el.controls = false

						el.setAttribute("playsinline", "true")
						el.setAttribute("webkit-playsinline", "true")

						/* ===== Safe autoplay loop ===== */
						let attempts = 0
						const MAX_ATTEMPTS = 8

						const tryPlay = () => {
							if (attempts >= MAX_ATTEMPTS) return
							attempts++

							const p = el.play()
							if (p && typeof p.catch === "function") {
								p.catch(() => {
									// retry quietly (no UI)
									setTimeout(tryPlay, 400)
								})
							}
						}

						/* ===== Multi-trigger autoplay ===== */
						tryPlay()

						const visibilityHandler = () => {
							if (!document.hidden) tryPlay()
						}

						document.addEventListener(
							"visibilitychange",
							visibilityHandler,
						)
						window.addEventListener("focus", tryPlay)
						window.addEventListener("touchstart", tryPlay, {
							once: true,
						})
						window.addEventListener("click", tryPlay, {once: true})

						/* ===== Cleanup ===== */
						return () => {
							document.removeEventListener(
								"visibilitychange",
								visibilityHandler,
							)
							window.removeEventListener("focus", tryPlay)
						}
					}}
				>
					<source src={videoSource} type="video/mp4" />
				</video>
			)}

			{/* ===== Static fallback (no video mode) ===== */}
			{!allowVideo && (
				<div
					className="fixed top-0 left-0 w-full h-full -z-10 bg-center bg-cover"
					style={{
						backgroundImage: "url('/images/home-video-poster.jpg')",
					}}
				/>
			)}

			{/* Dark overlay */}
			<div className="fixed inset-0 bg-black/30 -z-10" />

			{/* Mobile header overlay when menu open */}
			{isOpen && (
				<div className="fixed top-0 left-0 w-full h-[80px] bg-black/10 z-10 sm:hidden pointer-events-none" />
			)}

			{/* ========================
			   LAYOUT
			======================== */}
			<div
				className={`w-full min-h-screen sm:h-screen flex flex-col sm:flex-row p-6 sm:p-9 ${bgClass} ${
					isOpen ? "fixed" : "relative"
				}`}
			>
				<aside className="flex flex-col h-full min-h-0 w-full sm:w-[24rem]">
					{/* Header */}
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

						{/* Hamburger */}
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

					{/* ===== Floating mobile menu ===== */}
					<div
						className={`sm:hidden fixed top-[80px] left-0 w-full z-50 transition-all duration-300 ease-in-out transform origin-top ${
							isOpen
								? "h-[calc(100vh-80px)] opacity-100 scale-y-100 overflow-auto"
								: "h-0 opacity-0 scale-y-95 pointer-events-none overflow-hidden"
						}`}
					>
						{/* Overlay */}
						<div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />

						<nav
							className="relative z-10 h-full flex flex-col gap-2 py-4 px-6 text-white"
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

					{/* Sidebar */}
					{isXL ? (
						<div
							className={`flex-1 overflow-auto py-10 lg:py-4 xl:py-10 app-scroll ${sidebarClass}`}
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

					{/* Desktop nav */}
					<nav
						className="sm:flex items-center gap-16 hidden pt-2 text-white"
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

				{/* Main content */}
				{content && (
					<main className="flex-1 overflow-auto pl-0 sm:pl-6 xl:pl-12">
						{content}
					</main>
				)}

				{/* Search shortcut */}
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
