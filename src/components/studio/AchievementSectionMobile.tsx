// AchievementSectionMobile.tsx
import StudioSection from "./StudioSection"
import type {StudioEntry} from "./StudioContent"

interface Props {
	initialData?: StudioEntry | null
}

const AchievementSectionMobile = ({initialData}: Readonly<Props>) => {
	return (
		<StudioSection
			endpoint="/studio/achievement"
			initialData={initialData}
			className="text-white"
		/>
	)
}

export default AchievementSectionMobile
