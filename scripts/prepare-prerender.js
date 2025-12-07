// scripts/prepare-prerender.js
import fs from "fs"
import path from "path"

const ROOT = process.cwd()
const OUT = path.resolve(ROOT, "prerender-slugs.json")
const PAYLOAD_FILE = path.resolve(ROOT, ".prerender_payload.json")

// Small helper: safe JSON parse
function safeJsonParse(str, fallback) {
	try {
		return JSON.parse(str)
	} catch {
		return fallback
	}
}

// Parse slugs from PRERENDER_SLUGS env (JSON array or CSV)
function parseFromEnv() {
	const raw = process.env.PRERENDER_SLUGS
	if (!raw) return []

	const trimmed = String(raw).trim()
	if (!trimmed) return []

	// Try JSON first
	const parsed = safeJsonParse(trimmed, null)
	if (Array.isArray(parsed)) {
		return parsed.map((v) => String(v))
	}

	// Fallback: treat as comma-separated values
	return trimmed
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean)
		.map(String)
}

// Parse slugs from .prerender_payload.json (written by CI)
function parseFromFile() {
	if (!fs.existsSync(PAYLOAD_FILE)) return []

	const raw = fs.readFileSync(PAYLOAD_FILE, "utf-8").trim()
	if (!raw) return []

	const parsed = safeJsonParse(raw, [])
	if (Array.isArray(parsed)) {
		return parsed.map((v) => String(v))
	}

	return []
}

const envSlugs = parseFromEnv()
const fileSlugs = envSlugs.length ? [] : parseFromFile()

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

// Write result used by Astro's getStaticPaths (or similar)
fs.writeFileSync(OUT, JSON.stringify(cleanedSlugs, null, 2))

// Optional: remove payload file after using it, so old slugs can't leak
if (fs.existsSync(PAYLOAD_FILE)) {
	fs.unlinkSync(PAYLOAD_FILE)
}

console.log("[prepare:prerender] slugs:", cleanedSlugs)

process.exit(0)
