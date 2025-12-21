// tailwind.config.js
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,ts,tsx}", // Include React components
	],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		"min-h-screen",
		"tracking-widest",
		"underline-offset-4",
		"opacity-60",
		"opacity-70",
		"text-xs",
		"text-sm",
		"text-2xl",
		"text-3xl",
	],
}
