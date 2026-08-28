---
type: case-study
slug: streaming-thumbnails
order: 0
experienceId: spribe
needs_translation: false
stack:
  - Python
  - Pillow
  - n8n
  - GPT Images
  - Obsidian
  - Ollama
locale: en
title: Streaming thumbnails pipeline
cover: streaming-thumbnails/different-aspect-ratio.png
summary: >-
  Thumbnail system for a B2B movie aggregator — one geometry, several skins and ratios, four sizes, three formats. About
  30,000 titles; 864 files each.
---

```widget
id: thumbnail-pipeline
```

## Context

The platform was a B2B streaming aggregator. Every title needed posters that could land in any layout: the same geometry so the grid held together, several skins, nine aspect ratios, and png, webp, or progressive jpeg at large, medium, small, and tiny — so each surface could trade quality for speed. A skin is a title treatment plus an underlay. Original keeps the film's type; common uses one treatment across a customer's catalog.

Wednesday, Stranger Things, BoJack Horseman and the rest here are catalog titles from that aggregator, not a Netflix product.

The catalog never stood still. New providers joined; ones already on the pipe dropped premieres. The chain had to watch production first and the pre-release dump second: work on raw data early is what stops missing posters when a title goes live.

## Effort

**Duration.** 1 year

**Role.** Design Engineer

**Team.** Solo

### Constraints

- Catalog grew from new providers and premieres
- Provider originals arrived slowly, in mixed formats
- Early image models drifted in style and had no native transparency

### What was hard

- Model layers do not share a coordinate system, so a mixed grid looks drunk unless every foreground follows the same rules
- One common title treatment that still reads in a one- to three-line pocket
- White type on bright art
- Where to keep a human: a pass on layers, then QA on renders

## Process

fetch → parse → generate → crop → render → QA → upload

### Fetch the catalog

n8n fires on a database change and runs the design chain. Production is the priority; the raw provider dump is secondary. The fetch polls both and retries until new titles land in Workspace / RAW — keeping that raw base current is what prevents a title from shipping without a poster.

### Parse references

Diff the catalog against the local store and the to-do list appears: titles with no poster. Provider files were a poor automation source — slow, a different format every time. Public stills cover most of the catalog: IMDb and Rotten Tomatoes first; region-specific and niche films from the official site or image search. References lived in Obsidian.

### Generate layers

Consistency is the same deconstruction on every poster: foreground (person, animal, object), background, unique title. Each layer has its own prompt on the reference — background without type or a large subject; foreground uncropped on transparent; title at 2:1, also transparent. Gemini was first. It drifted, hallucinated, and had no alpha. Transparency can be faked in a script or a Photoshop batch, but edges are cleaner when the model emits it. Switched to GPT Images 2.0 when the API shipped. GPT runs the three prompts in parallel; outputs land in Workspace / Raw.

### Common titles

Some customers wanted one title treatment across the catalog — more contrast, the character does the talking. The hard part is filling negative space and splitting the name across one, two, or three lines so it reads. If the original title art is readable and already in one to three lines, OCR keeps that split. If the read fails or the name runs past three lines, a Python splitter does the job, then the common title is generated into Workspace / Raw.

### Crop and align

Background and title are light work: crop (models sometimes leave a white border), add title margin, resize. Foreground needs a point of interest. If there are people, detect mouths, take their bounding box, and sit that box on one horizontal axis. Crop transparent padding with the mouth as the anchor. No people: skip the vertical step if the subject is already cropped; otherwise align it on the same horizon. Then every layer is centered horizontally. A minimum face-size variable still controls how large the character sits.

![Foregrounds across titles — mouths on one horizon, then center](streaming-thumbnails/face-align.png)

*Same crop on every title. Cropped subjects skip the vertical step; then everything centers.*

### Render

Composite every required ratio, size, format, skin, and filename. Background always fills. Character pastes in the center, never resized. Unique or common title sits bottom-center, and scales down when the frame is thinner than 1:1. Some skins get an underlay — a colored or black gradient for title contrast. Hue comes from the background: scale to 9×9 and read the center pixel. Bright art still fails white-on-light, so the pipeline picks among 16 hues on a full cycle that keep the same white-on-color contrast. Pillow does the rest.

### Local AI QA

Two checks: leftover transparent pixels in the title, and whether the render still matches the reference. Match means character, title, and crop — not a facsimile of the marketing still. Pixel counting is cheap. Image compare does not need to be fast — Gemma 4 via Ollama ran overnight, so the workstation never sat idle. Obsidian showed original vs render plus both scores. Sort the score column and the queue orders itself. A plugin runs a shell script from the vault, so the same board is the control panel.

![BoJack Horseman — catalog reference next to the pipeline render](streaming-thumbnails/reference-vs-render.png "fit")

*Original vs render. Same character, title, and crop; the pipeline drops Netflix chrome. The catalog skin is louder on purpose.*

### Watchfolder delivery

The last hop is the easy one, and it can still be automatic. A watchfolder on the working directory uploads, notifies the team in Slack, syncs, and backs up.

## Impact

- About 30,000 original titles in a year. Each title is 864 files — 8 skins × 9 ratios × 4 sizes × 3 formats (png, webp, progressive jpeg) — about 26 million files
- A freelancer splitting stills into layers and setting common titles did about 1,000 titles a month. Title consistency was already failing. At that rate, 30,000 titles is roughly two and a half years of one person, before anyone composites a skin
- Compositing was never timed. A junior assembling even a small set of ratios by hand is minutes per title; 864 outputs per title is not a staffing plan. The matrix exists because render is a script
- Against that freelancer baseline plus a junior on compositing, designer time sits in the low hundreds of thousands of euros. The 26 million files only exist because the last steps are automatic
