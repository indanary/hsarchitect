import {useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import SelectCategory from "./SelectCategory"
import ProjectGallery from "./ProjectGallery"

export default function ProjectListContent() {
	const [category, setCategory] = useState("All")

	return (
		<LayoutWrapper
			sidebar={
				<div className="flex gap-10 text-white" slot="sidebar">
					<span className="text-xs font-semibold">
						Project Type
					</span>
					<SelectCategory onSelect={setCategory} />
				</div>
			}
			content={<ProjectGallery category={category} />}
		/>
	)
}
