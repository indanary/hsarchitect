import {useState} from "react"

import ProfileSectionMobile from "./ProfileSectionMobile"
import PhilosophySectionMobile from "./PhilosophySectionMobile"
import AchievementSectionMobile from "./AchievementSectionMobile"

const StudioMobile = () => {
	const [sections, setSections] = useState<
		("Profile" | "Philosophy" | "Achievement")[]
	>(["Profile", "Philosophy", "Achievement"])
	const [selectedSection, setSelectedSection] = useState("Profile")

	const renderSection = () => {
		switch (selectedSection) {
			case "Profile":
				return <ProfileSectionMobile />
			case "Philosophy":
				return <PhilosophySectionMobile />
			case "Achievement":
				return <AchievementSectionMobile />
			default:
				return null
		}
	}

	return (
		<div className="flex justify-between text-left gap-14">
			<div className="flex flex-col gap-4 text-white">
				{sections.map((section) => {
					const isSelected = selectedSection === section

					return (
						<span
							key={section}
							className="cursor-pointer text-xs-loose"
							onClick={() => {
								setSelectedSection(section)
							}}
							aria-current={isSelected ? "true" : undefined}
						>
							<span
								className={`inline-block border-b-2 transition-all duration-300 ${
									isSelected
										? "border-white font-bold"
										: "border-transparent hover:border-white/40 font-light"
								}`}
							>
								{section}
							</span>
						</span>
					)
				})}
			</div>

			{renderSection()}
		</div>
	)
}

export default StudioMobile
