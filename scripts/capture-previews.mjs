#!/usr/bin/env node
/**
 * Records a short (≈5s) muted clip of each project site — scrolling and opening a page —
 * for the moving previews on the project cards.
 *
 * Usage:
 *   pnpm previews:capture              # all sites in scripts/previews.config.mjs
 *   pnpm previews:capture navizo       # only the given ids
 *
 * Needs Playwright's Chromium (`pnpm exec playwright install chromium`) and, for trimmed,
 * compressed WebM + MP4 output, ffmpeg on your PATH (e.g. `brew install ffmpeg`).
 * Writes public/previews/<id>.{webm,mp4,jpg} and updates content/previews.json.
 */
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DURATION_SECONDS, OUTPUT_WIDTH, VIEWPORT, targets } from './previews.config.mjs';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'previews');
const TMP_DIR = path.join(ROOT, '.previews-tmp');
const MANIFEST = path.join(ROOT, 'content', 'previews.json');

const DEFAULT_STEPS = [
  { type: 'wait', ms: 300 },
  { type: 'scroll', by: 0.35 },
  {
    type: 'click',
    selector: 'header a[href^="/"]:not([href="/"]), nav a[href^="/"]:not([href="/"])',
  },
  { type: 'wait', ms: 900 },
  { type: 'scroll', by: 500 },
];

function hasFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** Eased scroll so the recording looks like a person scrolling, not a jump. */
async function smoothScroll(page, by) {
  await page.evaluate(async (by) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const distance = Math.min(by <= 1 ? max * by : by, max - scrollY);
    const start = scrollY;
    const duration = 1400;
    const t0 = performance.now();
    await new Promise((resolve) => {
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        scrollTo(0, start + distance * eased);
        if (p < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
  }, by);
}

async function runSteps(page, steps) {
  for (const step of steps) {
    if (step.type === 'wait') await page.waitForTimeout(step.ms);
    if (step.type === 'scroll') await smoothScroll(page, step.by);
    if (step.type === 'click') {
      const link = page.locator(step.selector).first();
      if (await link.count()) {
        await Promise.all([
          page.waitForLoadState('networkidle').catch(() => {}),
          link.click({ timeout: 2000 }).catch(() => {}),
        ]);
      }
    }
  }
}

export async function capture(target, { ffmpeg = hasFfmpeg() } = {}) {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: TMP_DIR, size: VIEWPORT },
  });
  const page = await context.newPage();
  const recordingStart = Date.now();

  await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(400);
  const loadedAt = (Date.now() - recordingStart) / 1000;
  const poster = path.join(OUT_DIR, `${target.id}.jpg`);
  await page.screenshot({ path: poster, type: 'jpeg', quality: 80 });

  await runSteps(page, target.steps ?? DEFAULT_STEPS);
  await page.waitForTimeout(300);

  const video = page.video();
  await context.close();
  await browser.close();
  const raw = await video.path();

  const entry = { poster: `/previews/${target.id}.jpg` };
  const webm = path.join(OUT_DIR, `${target.id}.webm`);
  if (ffmpeg) {
    // Skip the page load, keep DURATION_SECONDS, scale down and compress.
    const common = [
      '-y',
      '-ss',
      String(loadedAt),
      '-i',
      raw,
      '-t',
      String(DURATION_SECONDS),
      '-an',
    ];
    const scale = ['-vf', `scale=${OUTPUT_WIDTH}:-2`];
    execFileSync(
      'ffmpeg',
      [...common, ...scale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '42', '-row-mt', '1', webm],
      { stdio: 'ignore' }
    );
    const mp4 = path.join(OUT_DIR, `${target.id}.mp4`);
    execFileSync(
      'ffmpeg',
      [
        ...common,
        ...scale,
        '-c:v',
        'libx264',
        '-pix_fmt',
        'yuv420p',
        '-crf',
        '30',
        '-preset',
        'slow',
        '-movflags',
        '+faststart',
        mp4,
      ],
      { stdio: 'ignore' }
    );
    // Replace the full-size screenshot with a small poster frame from the clip itself.
    execFileSync('ffmpeg', ['-y', '-i', webm, '-frames:v', '1', '-q:v', '5', poster], {
      stdio: 'ignore',
    });
    entry.webm = `/previews/${target.id}.webm`;
    entry.mp4 = `/previews/${target.id}.mp4`;
  } else {
    // Without ffmpeg the raw recording is kept as-is (includes the page load, larger file).
    await rename(raw, webm);
    entry.webm = `/previews/${target.id}.webm`;
  }
  return entry;
}

async function main() {
  const only = process.argv.slice(2);
  const selected = only.length ? targets.filter((t) => only.includes(t.id)) : targets;
  if (!selected.length) throw new Error(`No targets match: ${only.join(', ')}`);

  const ffmpeg = hasFfmpeg();
  if (!ffmpeg) console.warn('ffmpeg not found: keeping raw, uncompressed recordings.');

  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8').catch(() => '{}'));
  for (const target of selected) {
    process.stdout.write(`Recording ${target.id} (${target.url})… `);
    try {
      manifest[target.id] = await capture(target, { ffmpeg });
      console.log('done');
    } catch (error) {
      console.log(`failed: ${error.message}`);
    }
  }
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  await rm(TMP_DIR, { recursive: true, force: true });
  console.log(`Updated ${path.relative(ROOT, MANIFEST)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
