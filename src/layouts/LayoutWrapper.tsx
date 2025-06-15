import {useEffect, useState, type ReactNode} from "react"

interface LayoutWrapperProps {
	sidebar?: ReactNode
	content?: ReactNode
	theme?: "dark" | "light"
}

export default function LayoutWrapper({
	sidebar,
	content,
	theme = "dark",
}: Readonly<LayoutWrapperProps>) {
	const [path, setPath] = useState("/")

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPath(window.location.pathname)
		}
	}, [])

	const isActive = (href: string) => path === href

	const bgClass =
		theme === "dark" ? "bg-[#071E50] text-white" : "bg-white text-black"

	return (
		<div className={`w-full h-screen flex p-12 ${bgClass}`}>
			<aside className="flex flex-col h-full w-[22rem]">
				<a href="/">
					<img
						src={
							theme === "dark"
								? "/images/hsarchitect-logo-light.png"
								: "/images/hsarchitect-logo-dark.png"
						}
						alt="HS Architect Logo"
						width={188}
						height="auto"
						className="w-[188px] h-auto object-contain"
						loading="lazy"
						decoding="async"
					/>
				</a>

				<div className="flex-1 overflow-auto py-12">{sidebar}</div>

				<nav
					className="flex items-center gap-16"
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
							className={`hover:opacity-80 transition-colors text-xs ${
								isActive(href) ? "font-bold" : ""
							}`}
						>
							{label}
						</a>
					))}
				</nav>
			</aside>

			{content && (
				<main className="flex-1 overflow-auto pl-12">{content}</main>
			)}
		</div>
	)
}
