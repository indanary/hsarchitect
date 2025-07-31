import LayoutWrapper from "../../layouts/LayoutWrapper"
import SearchResult from "./SearchResult"

export default function SearchContent() {
	return (
		<LayoutWrapper
			theme="light"
			content={<SearchResult />}
			sidebarClass="hidden sm:flex"
		/>
	)
}
