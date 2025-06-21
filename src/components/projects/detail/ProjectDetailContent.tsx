import LayoutWrapper from "../../../layouts/LayoutWrapper"
import DetailInformation from "./Detailinformation"
import ProjectCarousel from "./ProjectCarousel"

interface Project {
	id: number
	title: string
	imageUrl: string
	description: string
}

export default function ProjectDetailContent({project}: {project: Project}) {
	const images = [
		"https://picsum.photos/id/1015/800/472",
		"https://picsum.photos/id/1016/800/472",
		"https://picsum.photos/id/1018/800/472",
	]

	return (
		<LayoutWrapper
			theme="light"
			sidebar={<DetailInformation project={project} />}
			content={<ProjectCarousel images={images} />}
		/>
	)
}
