import {useState} from "react"
import LayoutWrapper from "../../../layouts/LayoutWrapper"
import SelectCategory from "./SelectCategory"
import ProjectGallery from "./ProjectGallery"

type ProjectType = {id: number | string; project_type: string}

interface Props {
	categories: ProjectType[]
}

export default function ProjectListContent({categories}: Readonly<Props>) {
	const [typeId, setTypeId] = useState<string | null>(null) // null = All

	return (
		<LayoutWrapper
			sidebar={
				<div className="flex gap-10 text-white" slot="sidebar">
					<span className="text-xs-loose font-semibold whitespace-nowrap">
						Project Type
					</span>
					<SelectCategory
						onSelect={setTypeId}
						categories={categories}
					/>
				</div>
			}
			content={<ProjectGallery projectTypeId={typeId} />}
		/>
	)
}
