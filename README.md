Jennifer Louise Lynch Portfolio 2026

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # type-check, lint and format check
```

## Moving project previews

Each project card can show a short, muted clip of the live site (scrolling and opening a page).

```bash
pnpm exec playwright install chromium   # once
pnpm previews:capture                    # record every site
pnpm previews:capture navizo             # or just one
```

- Sites and optional per-site steps live in `scripts/previews.config.mjs`.
- Clips are written to `public/previews/` and listed in `content/previews.json`. Cards without a clip stay text-only.
- With [ffmpeg](https://ffmpeg.org) installed (`brew install ffmpeg`) clips are trimmed to 5 seconds and compressed to WebM + MP4 (roughly 150 KB each).
- Switch between the clip at the top of the card and behind the text with `previewStyle` in `content/previews.ts`.
- Re-run the capture whenever a site changes, then commit the new files.
