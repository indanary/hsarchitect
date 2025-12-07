// scripts/prepare-prerender.js
import fs from "fs"
import path from "path"

const ROOT = process.cwd()
const OUT = path.resolve(ROOT, "prerender-slugs.json")
const PAYLOAD_FILE = path.resolve(ROOT, ".prerender_payload.json")

// ---- helpers ----
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

	// Fallback: CSV
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

// Main logic in an async IIFE so we can `await fetch`
;(async () => {
	const envSlugs = parseFromEnv()
	const fileSlugs = envSlugs.length ? [] : parseFromFile()

	// Prefer env slugs if present, else file slugs
	const rawSlugs = envSlugs.length ? envSlugs : fileSlugs

	// Clean up slugs
	let cleanedSlugs = Array.from(
		new Set(
			rawSlugs
				.map(String)
				.map((s) => s.trim())
				.filter(Boolean)
				.filter((s) => s !== "__ALL__"),
		),
	)

	// If still empty, fall back to "all projects from API"
	if (cleanedSlugs.length === 0) {
		const base = process.env.PUBLIC_API_BASE_URL
		if (!base) {
			console.warn(
				"[prepare:prerender] No PRERENDER_SLUGS and no PUBLIC_API_BASE_URL; keeping []",
			)
		} else {
			try {
				const url = `${base.replace(/\/+$/, "")}/projects/public`
				console.log(
					"[prepare:prerender] Fetching all project IDs from",
					url,
				)

				const res = await fetch(url)
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`)
				}

				const data = await res.json()
				if (Array.isArray(data)) {
					cleanedSlugs = data
						.map((p) => (p && p.id != null ? String(p.id) : null))
						.filter(Boolean)
				}
			} catch (err) {
				console.error(
					"[prepare:prerender] Failed to fetch all projects:",
					err?.message || err,
				)
			}
		}
	}

	// Write final slugs file
	fs.writeFileSync(OUT, JSON.stringify(cleanedSlugs, null, 2))

	// Remove payload file so old slugs don't leak
	if (fs.existsSync(PAYLOAD_FILE)) {
		fs.unlinkSync(PAYLOAD_FILE)
	}

	console.log("[prepare:prerender] final slugs:", cleanedSlugs)

	process.exit(0)
})()
