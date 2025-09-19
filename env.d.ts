/// <reference path="astro/client.d.ts" />
interface ImportMetaEnv {
	readonly API_BASE_URL: string // server only
	readonly API_TOKEN: string // server only
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}
