import {useEffect, useState, type ReactNode} from "react"

interface LayoutWrapperProps {
	sidebar?: ReactNode
	content?: ReactNode
}

export default function LayoutWrapper({
	sidebar,
	content,
}: Readonly<LayoutWrapperProps>) {
	const [path, setPath] = useState("/")

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname)
		}
	}, [])

	const isActive = (href: string) => path === href

	return (
		<>
			<aside className="flex flex-col h-full w-[22rem] text-white">
				<a href="/">
					<img
						src="/src/images/hsarchitect-logo.png"
						alt="HS Architect Logo"
						width={188}
						height="auto"
						className="w-[188px] h-auto object-contain"
						loading="lazy"
						decoding="async"
					/>
				</a>

				{/* Always render wrapper, sidebar can be empty */}
				<div className="flex-1 overflow-auto py-12">{sidebar}</div>

				<nav
					className="flex items-center gap-16"
					role="navigation"
					aria-label="Main navigation"
				>
					<a
						href="/projects"
						className={`hover:text-gray-300 transition-colors ${
							isActive("/projects") ? "font-bold" : ""
						}`}
					>
						Projects
					</a>
					<a
						href="/studio"
						className={`hover:text-gray-300 transition-colors ${
							isActive("/studio") ? "font-bold" : ""
						}`}
					>
						Studio
					</a>
					<a
						href="/contact"
						className={`hover:text-gray-300 transition-colors ${
							isActive("/contact") ? "font-bold" : ""
						}`}
					>
						Contact
					</a>
				</nav>
			</aside>

			{/* Conditionally render content area if provided */}
			{content && (
				<main className="flex-1 overflow-auto pl-12">{content}</main>
			)}
		</>
	)
}
