// src/lib/api/projectTypes.ts
import {apiFetch} from "./base"

export interface ProjectType {
	id: number | string
	project_type: string
}

/** Public list of project types */
export async function getProjectTypesPublic() {
	// Backend route: GET /project-types/public
	return apiFetch<ProjectType[]>("/project-types/public")
}
