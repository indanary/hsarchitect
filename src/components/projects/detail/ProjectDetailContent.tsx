import LayoutWrapper from "../../../layouts/LayoutWrapper"
import DetailInformation from "./Detailinformation"
import ProjectCarousel from "./ProjectCarousel"

interface Project {
	id: number
	title: string
	description: string
	images: string[]
}

export default function ProjectDetailContent({id}: {id: string}) {
	const images = [
		"/images/project-example.png",
		"/images/project-example.png",
		"/images/project-example.png",
	]

	return (
		<LayoutWrapper
			showSearch
			theme="light"
			sidebar={<DetailInformation />}
			content={
				<ProjectCarousel
					images={images}
					wrapperClass="xl:pl-10 overflow-hidden mt-16 xl:mt-21 hidden sm:block"
					size="xl:w-[840px] h-[432px] xl:h-[540px]"
				/>
			}
		/>
	)
}
