// @ts-check
import {defineConfig} from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"

export default defineConfig({
	site: "https://hsarchitect.id",
	// Static output is the default; you can also set output: "static"
	// output: "static",
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [react()],
})
