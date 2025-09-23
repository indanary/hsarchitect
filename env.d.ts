/// <reference path="astro/client.d.ts" />
interface ImportMetaEnv {
	readonly API_TOKEN: string // server only
	readonly PUBLIC_API_BASE_URL: string // public base url
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}
