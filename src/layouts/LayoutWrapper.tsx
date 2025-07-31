import {useEffect, useState, type ReactNode} from "react"

interface LayoutWrapperProps {
	sidebar?: ReactNode
	sidebarClass?: string
	content?: ReactNode
	theme?: "dark" | "light"
	showSearch?: boolean
}

export default function LayoutWrapper({
	sidebar,
	sidebarClass = "",
	content,
	theme = "dark",
	showSearch = false,
}: Readonly<LayoutWrapperProps>) {
	const [path, setPath] = useState("/")
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname)
		}
	}, [])

	const isActive = (href: string) => path.startsWith(href)

	const bgClass =
		theme === "dark" ? "bg-[#071E50] text-white" : "bg-white text-black"

	return (
		<div
			className={`w-full min-h-screen sm:h-screen flex flex-col sm:flex-row p-6 sm:p-9 ${bgClass} ${isOpen ? 'fixed' : 'relative'}`}
		>
			<aside className="flex flex-col h-full w-full sm:w-[24rem]">
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
							loading="lazy"
							decoding="async"
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
								isOpen ? "rotate-45 translate-y-[5.25px]" : ""
							} ${
								theme === "dark" ? "bg-white" : "bg-[#071E50]"
							}`}
						/>
						<span
							className={`block h-[1.5px] w-full transition-transform duration-300 ${
								isOpen ? "-rotate-45 -translate-y-[5.25px]" : ""
							} ${
								theme === "dark" ? "bg-white" : "bg-[#071E50]"
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

				<div className={`flex-1 overflow-auto py-10 ${sidebarClass}`}>
					{sidebar}
				</div>

				<nav
					className={`sm:flex items-center gap-16 hidden ${
						theme === "dark"
							? "bg-[#071E50] text-white"
							: "bg-white text-[#071E50]"
					}`}
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
				<main className="flex-1 overflow-hidden pl-0 sm:pl-12">
					{content}
				</main>
			)}

			{showSearch && (
				<a
					href="/search"
					className={`fixed bottom-9 right-12 z-50 hover:opacity-80 transition-colors text-xs-loose hidden sm:block ${
						isActive("/search") ? "font-bold" : ""
					} ${theme === "dark" ? "text-white" : "text-[#071E50]"}`}
				>
					Search.........
				</a>
			)}
		</div>
	)
}
