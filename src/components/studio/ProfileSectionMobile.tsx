// src/components/studio/ProfileSectionMobile.tsx
import StudioSection from "./StudioSection"
import type {StudioEntry} from "./StudioContent"

interface Props {
	initialData?: StudioEntry | null
}

const ProfileSectionMobile = ({initialData}: Readonly<Props>) => {
	return (
		<StudioSection
			endpoint="/studio/profile"
			initialData={initialData}
			className="text-white" // mobile-friendly container
		/>
	)
}

export default ProfileSectionMobile
