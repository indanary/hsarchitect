// src/components/search/SearchContent.tsx
import LayoutWrapper from "../../layouts/LayoutWrapper"
import SearchResult from "./SearchResult"

type ApiProject = {
	id: number | string
	title: string
	location?: string
	cover_url?: string | null
	media?: {
		type: "image" | "video"
		url?: string | null
		thumb_url?: string | null
		sort_order?: number
	}[]
}

interface Props {
	initialProjects: ApiProject[]
}

export default function SearchContent({initialProjects}: Readonly<Props>) {
	return (
		<LayoutWrapper
			theme="light"
			content={<SearchResult initialProjects={initialProjects} />}
			sidebarClass="hidden sm:flex"
		/>
	)
}
