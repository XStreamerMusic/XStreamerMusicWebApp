// scripts/prerender.js
import puppeteer from "puppeteer";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = ["/", "/giveaways", "/lyric-cards"];

function startServer() {
    return new Promise((resolve, reject) => {
        const server = spawn(
            `npx serve "${DIST_DIR}" -l ${PORT} -s`,
            { stdio: "pipe", shell: true }
        );

        server.stdout.on("data", (data) => {
            if (data.toString().includes("Accepting connections")) {
                resolve(server);
            }
        });

        server.stderr.on("data", (data) => {
            console.error(data.toString());
        });

        server.on("error", reject);
        setTimeout(() => resolve(server), 2000);
    });
}

// Renders a route and RETURNS the html — does not write to disk.
// Keeping render and write separate is what prevents self-contamination:
// dist/index.html (the SPA fallback every other route relies on while
// this script is still running) must stay untouched until ALL routes
// have been crawled from the original, unmodified build output.
async function renderRoute(browser, route) {
    const page = await browser.newPage();

    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle0" });

    await page.waitForFunction(
        () => document.title && document.title.length > 0,
        { timeout: 5000 }
    ).catch(() => {
        console.warn(`  ⚠ title wait timed out for ${route}, continuing anyway`);
    });

    await new Promise((r) => setTimeout(r, 300));

    const html = await page.content();
    await page.close();

    console.log(`✓ rendered ${route}`);
    return html;
}

async function writeRoute(route, html) {
    const outDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`  written -> ${path.relative(DIST_DIR, outDir)}/index.html`);
}

async function main() {
    console.log("Starting static server for prerender...");
    const server = await startServer();

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const results = {};

    try {
        // PHASE 1: render every route while dist/index.html is still
        // the pristine, un-prerendered build output.
        for (const route of ROUTES) {
            results[route] = await renderRoute(browser, route);
        }
    } finally {
        await browser.close();
        server.kill();
    }

    // PHASE 2: only now do we write anything to disk, including
    // overwriting dist/index.html itself.
    for (const route of ROUTES) {
        await writeRoute(route, results[route]);
    }

    console.log("Prerender complete.");
}

main().catch((err) => {
    console.error("Prerender failed:", err);
    process.exit(1);
});