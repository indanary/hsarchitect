import {useState} from "react"

import LayoutWrapper from "../../layouts/LayoutWrapper"
import SelectSection from "./SelectSection"
import ProfileSection from "./ProfileSection"
import PhilosophySection from "./PhilosophySection"
import AchievementSection from "./AchievementSection"

export default function StudioContent() {
	const [section, setSection] = useState<
		"Profile" | "Philosophy" | "Achievement"
	>("Profile")

	const renderSection = () => {
		switch (section) {
			case "Profile":
				return <ProfileSection />
			case "Philosophy":
				return <PhilosophySection />
			case "Achievement":
				return <AchievementSection />
			default:
				return null
		}
	}

	return (
		<LayoutWrapper
			showSearch
			sidebar={
				<div className="flex gap-10 text-white">
					{/* Spacer div */}
					<div className="w-[72px] h-[48px]" />
					<SelectSection onSelect={setSection} />
				</div>
			}
			content={renderSection()}
		/>
	)
}
