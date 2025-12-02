// src/components/studio/AchievementSection.tsx
import StudioSection from "./StudioSection"
import type {StudioEntry} from "./StudioContent"

interface Props {
	initialData?: StudioEntry | null
}

export default function AchievementSection({initialData}: Readonly<Props>) {
	return (
		<StudioSection
			endpoint="/studio/achievement"
			initialData={initialData}
		/>
	)
}
