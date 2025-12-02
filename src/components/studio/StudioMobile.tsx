// src/components/studio/StudioMobile.tsx
import {useState} from "react"
import type {StudioEntry} from "./StudioContent"

import ProfileSectionMobile from "./ProfileSectionMobile"
import PhilosophySectionMobile from "./PhilosophySectionMobile"
import AchievementSectionMobile from "./AchievementSectionMobile"

interface Props {
	initialProfile?: StudioEntry | null
	initialPhilosophy?: StudioEntry | null
	initialAchievement?: StudioEntry | null
}

const StudioMobile = ({
	initialProfile,
	initialPhilosophy,
	initialAchievement,
}: Readonly<Props>) => {
	const [sections] = useState<("Profile" | "Philosophy" | "Achievement")[]>([
		"Profile",
		"Philosophy",
		"Achievement",
	])
	const [selectedSection, setSelectedSection] = useState<
		"Profile" | "Philosophy" | "Achievement"
	>("Profile")

	const renderSection = () => {
		switch (selectedSection) {
			case "Profile":
				return <ProfileSectionMobile initialData={initialProfile} />
			case "Philosophy":
				return (
					<PhilosophySectionMobile initialData={initialPhilosophy} />
				)
			case "Achievement":
				return (
					<AchievementSectionMobile
						initialData={initialAchievement}
					/>
				)
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
