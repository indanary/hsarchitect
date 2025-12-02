// PhilosophySectionMobile.tsx
import StudioSection from "./StudioSection"
import type {StudioEntry} from "./StudioContent"

interface Props {
	initialData?: StudioEntry | null
}

const PhilosophySectionMobile = ({initialData}: Readonly<Props>) => {
	return (
		<StudioSection
			endpoint="/studio/philosophy"
			initialData={initialData}
			className="text-white"
		/>
	)
}

export default PhilosophySectionMobile
