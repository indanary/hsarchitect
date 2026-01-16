// @ts-check
import {defineConfig} from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
	site: "https://hsarchitect.id",
	trailingSlash: "never",
	// Static output is the default; you can also set output: "static"
	output: "static",
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		sitemap({
			filenameBase: "sitemap-index",
		}),
	],
})
