import {apiFetch} from "./base"

export type StudioType = "profile" | "philosophy" | "achievement"

export interface StudioEntry {
	id: number | string
	type: StudioType // 'profile' | 'philosophy' | 'achievement'
	description: string // HTML string
}

/** Public studio section by type */
export async function getStudioSection(type: StudioType) {
	return apiFetch<StudioEntry>(`/studio/${type}`)
}
