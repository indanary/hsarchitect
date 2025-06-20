import {useState, useEffect} from "react"

interface Props {
	onSelect?: (category: "Profile" | "Philosophy" | "Achievement") => void
}

export default function SelectSection({onSelect}: Readonly<Props>) {
	const [sections, setSections] = useState<
		("Profile" | "Philosophy" | "Achievement")[]
	>(["Profile", "Philosophy", "Achievement"])
	const [selectedSection, setSelectedSection] = useState("Profile")

	return (
		<div className="flex flex-col gap-3 text-white font-semibold">
			{sections.map((section) => {
				const isSelected = selectedSection === section

				return (
					<span
						key={section}
						className="cursor-pointer text-xs"
						onClick={() => {
							setSelectedSection(section)
							onSelect?.(section)
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
							{section}
						</span>
					</span>
				)
			})}
		</div>
	)
}
