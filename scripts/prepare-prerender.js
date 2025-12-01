// scripts/prepare-prerender.js
import fs from "fs"
import path from "path"

const OUT = path.resolve(process.cwd(), "prerender-slugs.json")
const PAYLOAD_FILE = path.resolve(process.cwd(), ".prerender_payload.json")

// parse PRERENDER_SLUGS env (JSON array or CSV)
function parseFromEnv() {
	const raw = process.env.PRERENDER_SLUGS || ""
	if (!raw) return []
	try {
		const parsed = JSON.parse(raw)
		if (Array.isArray(parsed)) return parsed.map(String)
	} catch (e) {
		return raw
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean)
			.map(String)
	}
}

// parse .prerender_payload.json (CI writes this)
function parseFromFile() {
	if (!fs.existsSync(PAYLOAD_FILE)) return []
	try {
		const raw = fs.readFileSync(PAYLOAD_FILE, "utf-8")
		const parsed = JSON.parse(raw || "[]")
		if (Array.isArray(parsed)) return parsed.map(String)
	} catch (e) {
		return []
	}
}

const envSlugs = parseFromEnv()
const fileSlugs = parseFromFile()

// Prefer env slugs if present, else file slugs
const rawSlugs = envSlugs.length ? envSlugs : fileSlugs

// 🧹 Clean up slugs:
// - normalize to string & trim
// - drop empty
// - drop special "__ALL__" marker
// - dedupe
const cleanedSlugs = Array.from(
	new Set(
		rawSlugs
			.map(String)
			.map((s) => s.trim())
			.filter(Boolean)
			.filter((s) => s !== "__ALL__"),
	),
)

if (rawSlugs.includes("__ALL__")) {
	console.log(
		'prepare-prerender: "__ALL__" marker detected, ignoring it for prerender-slugs.json',
	)
}

// write result
fs.writeFileSync(OUT, JSON.stringify(cleanedSlugs, null, 2))
console.log(`Wrote ${OUT} with ${cleanedSlugs.length} slug(s)`)

process.exit(0)
