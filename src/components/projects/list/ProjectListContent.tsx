import {useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import SelectCategory from "./SelectCategory"
import ProjectGallery from "./ProjectGallery"

export default function ProjectListContent() {
	const [typeId, setTypeId] = useState<string | null>(null) // null = All

	return (
		<LayoutWrapper
			sidebar={
				<div className="flex gap-10 text-white" slot="sidebar">
					<span className="text-xs-loose font-semibold whitespace-nowrap">
						Project Type
					</span>
					<SelectCategory onSelect={setTypeId} />
				</div>
			}
			content={<ProjectGallery projectTypeId={typeId} />}
		/>
	)
}
