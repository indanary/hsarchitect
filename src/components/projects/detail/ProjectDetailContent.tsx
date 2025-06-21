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
		"/images/project-example.png",
		"/images/project-example.png",
		"/images/project-example.png",
	]

	return (
		<LayoutWrapper
			theme="light"
			sidebar={<DetailInformation project={project} />}
			content={<ProjectCarousel images={images} />}
		/>
	)
}
