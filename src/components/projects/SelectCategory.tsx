import {useState, useEffect} from "react"

interface Props {
	onSelect?: (category: string) => void
}

export default function CategorySelector({onSelect}: Readonly<Props>) {
	const [categories, setCategories] = useState(["All", "Residenccial"])
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
		<div className="flex flex-col gap-2 text-white font-semibold">
			{categories.map((category) => {
				const isSelected = selectedCategory === category

				return (
					<button
						key={category}
						type="button"
						onClick={() => {
							setSelectedCategory(category)
							onSelect?.(category)
						}}
						className="text-left cursor-pointer focus:outline-none"
						aria-current={isSelected ? "true" : undefined}
					>
						<span
							className={`inline-block border-b-2 transition-all duration-300 ${
								isSelected
									? "border-white"
									: "border-transparent hover:border-white/40"
							}`}
						>
							{category}
						</span>
					</button>
				)
			})}
		</div>
	)
}
