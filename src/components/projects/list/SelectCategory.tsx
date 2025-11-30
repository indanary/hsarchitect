// src/components/projects/list/SelectCategory.tsx
import {useState} from "react"

interface Props {
	categories: ProjectType[]
	onSelect?: (typeId: string | null) => void // null = All
}

type ProjectType = {id: number | string; project_type: string}

export default function SelectCategory({
	categories,
	onSelect,
}: Readonly<Props>) {
	const [selectedId, setSelectedId] = useState<string>("all")

	const allOption = {id: "all", project_type: "All"}
	const options = [allOption, ...categories]

	return (
		<div className="flex flex-row flex-wrap sm:flex-col gap-3 text-white font-normal">
			{options.map((opt) => {
				const id = String(opt.id)
				const isSelected = selectedId === id
				return (
					<span
						key={id}
						className="cursor-pointer text-xs-loose"
						onClick={() => {
							setSelectedId(id)
							onSelect?.(id === "all" ? null : id)
						}}
						aria-current={isSelected ? "true" : undefined}
					>
						<span
							className={`inline-block border-b-2 transition-all duration-300 ${
								isSelected
									? "border-white font-bold"
									: "border-transparent hover:border-white/40"
							}`}
						>
							{opt.project_type}
						</span>
					</span>
				)
			})}
		</div>
	)
}
