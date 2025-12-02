// src/components/studio/PhilosophySection.tsx
import StudioSection from "./StudioSection"
import type {StudioEntry} from "./StudioContent"

interface Props {
	initialData?: StudioEntry | null
}

export default function PhilosophySection({initialData}: Readonly<Props>) {
	return (
		<StudioSection
			endpoint="/studio/philosophy"
			initialData={initialData}
		/>
	)
}
