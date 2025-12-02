// src/components/search/SearchContent.tsx
import LayoutWrapper from "../../layouts/LayoutWrapper"
import SearchResult from "./SearchResult"

type ApiProject = {
	id: number | string
	title: string
	location?: string | null
	cover_url?: string | null
	cover_thumb_url?: string | null
	cover_file_path?: string | null
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
