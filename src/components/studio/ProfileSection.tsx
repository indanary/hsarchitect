// src/components/studio/ProfileSection.tsx
import StudioSection from "./StudioSection"
import type {StudioEntry} from "./StudioContent"

interface Props {
	initialData?: StudioEntry | null
}

export default function ProfileSection({initialData}: Readonly<Props>) {
	return (
		<StudioSection endpoint="/studio/profile" initialData={initialData} />
	)
}
