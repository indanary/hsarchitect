import {useState, useEffect} from "react"

interface Props {
	onSelect?: (category: string) => void
}

export default function CategorySelector({onSelect}: Readonly<Props>) {
	const [categories, setCategories] = useState(["All"])
	const [selectedCategory, setSelectedCategory] = useState("All")

	// Optional: fetch from API later
	// useEffect(() => {
	// 	fetch('/api/categories')
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setCategories(data.categories);
	// 		})
	// 		.catch(console.error);
	// }, []);

	if (categories.length === 0) {
		return <span className="text-white">Loading...</span>
	}

	return (
		<div className="flex flex-col gap-3 text-white font-semibold">
			{categories.map((category) => {
				const isSelected = selectedCategory === category

				return (
					<span
						key={category}
						className="cursor-pointer text-xs-loose"
						onClick={() => {
							setSelectedCategory(category)
							onSelect?.(category)
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
							{category}
						</span>
					</span>
				)
			})}
		</div>
	)
}
