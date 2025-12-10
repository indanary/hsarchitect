// src/components/studio/StudioContent.tsx
import {useState} from "react"
import {useIsMobile} from "../../utils/useIsMobile"
import LayoutWrapper from "../../layouts/LayoutWrapper"
import SelectSection from "./SelectSection"
import ProfileSection from "./ProfileSection"
import PhilosophySection from "./PhilosophySection"
import AchievementSection from "./AchievementSection"
import StudioMobile from "./StudioMobile"

export type StudioEntry = {
	data: {
		id: number | string
		type: "profile" | "philosophy" | "achievement"
		description: string
	}
}

interface Props {
	initialProfile?: StudioEntry | null
	initialPhilosophy?: StudioEntry | null
	initialAchievement?: StudioEntry | null
}

export default function StudioContent({
	initialProfile,
	initialPhilosophy,
	initialAchievement,
}: Readonly<Props>) {
	const isMobile = useIsMobile()

	const [section, setSection] = useState<
		"Profile" | "Philosophy" | "Achievement"
	>("Profile")

	const renderSection = () => {
		switch (section) {
			case "Profile":
				return <ProfileSection initialData={initialProfile} />
			case "Philosophy":
				return <PhilosophySection initialData={initialPhilosophy} />
			case "Achievement":
				return <AchievementSection initialData={initialAchievement} />
			default:
				return null
		}
	}

	return (
		<>
			{!isMobile ? (
				<LayoutWrapper
					showSearch
					sidebar={
						<div className="flex gap-10 text-white">
							<div className="w-[72px] h-[48px]" />
							<SelectSection onSelect={setSection} />
						</div>
					}
					content={renderSection()}
				/>
			) : (
				<LayoutWrapper
					showSearch
					sidebar={
						<StudioMobile
							initialProfile={initialProfile}
							initialPhilosophy={initialPhilosophy}
							initialAchievement={initialAchievement}
						/>
					}
				/>
			)}
		</>
	)
}
