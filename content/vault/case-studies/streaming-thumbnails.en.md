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
  Thumbnail system for a B2B movie aggregator — one geometry, several skins and ratios, four file sizes. Nearly 30,000
  posters in a year.
---

## Context

The platform was a B2B streaming aggregator. Every title needed posters that could land in any layout: the same geometry so the grid held together, several skins, several aspect ratios, and png, webp, or progressive jpeg at big, medium, small, and tiny — so each surface could trade quality for speed.

The catalog never stood still. New providers joined; ones already on the pipe dropped premieres. Manual fetch was too slow. The chain had to watch production first and the pre-release dump second: work on raw data early is what stops missing posters when a title goes live.

## Effort

**Duration.** 1 year

**Role.** Design Engineer

**Team.** Solo

### Constraints

- Catalog grew from new providers and premieres
- Provider originals arrived slowly, in mixed formats
- Public catalogs sat behind Cloudflare
- Early image models drifted in style and had no native transparency

### What was hard

- Same crop and geometry rules across tens of thousands of titles
- Titles fitted into one, two, or three lines of negative space
- Mouths on one horizon; cropped subjects skip the vertical step
- Type readable on bright art

*From catalog change to delivery.*

```mermaid
flowchart TD
  fetch["Fetch new movies<br/>in database"]
  parse["Parse catalogs<br/>for reference"]
  generate["Generate assets"]
  edit["Edit assets"]
  visual["Visual check"]
  render["Render assets"]
  upload["Upload to database"]
  notifyMe["Notify me in Slack"]:::notify
  qa["QA tests"]
  notifyTeam["Notify team in Slack"]:::notify
  fetch --> parse --> generate --> edit --> visual --> render --> upload
  edit --> notifyMe
  render --> qa
  upload --> notifyTeam
```

## Process

### Fetch the catalog

n8n fires on a database change and runs the design chain. Production is the priority; the raw provider dump is secondary. The fetch polls both and retries until new titles land in Workspace / RAW — keeping that raw base current is what prevents a title from shipping without a poster.

### Gather references

Diff the catalog against the local store and the to-do list appears: titles with no poster. Provider files were a poor automation source — slow, a different format every time. Public stills first: IMDb and Rotten Tomatoes cover most of the catalog; region-specific and niche films come from the official site or image search. Playwright died on Cloudflare. Chrome CDP, with one human pass per session, did not. References lived in Obsidian.

*Poster fallback: IMDB, official site, then Google Images.*

```mermaid
flowchart TD
  diff["DIFF: New Movies"]
  imdb[Parse IMDB]
  hasImdb{Has movie poster}
  official[Parse official site]
  hasOfficial{Has movie poster}
  google[Find on Google Images]
  download[Download reference]
  refs["Workspace / References"]

  diff --> imdb
  imdb --> hasImdb
  hasImdb -->|No| official
  hasImdb -->|Yes| download
  official --> hasOfficial
  hasOfficial -->|No| google
  hasOfficial -->|Yes| download
  google --> download
  download --> refs
```

### Generate layers

Consistency is the same deconstruction on every poster: foreground (person, animal, object), background, unique title. Each layer has its own prompt on the reference — background without type or a large subject; foreground uncropped on transparent; title at 2:1, also transparent. Gemini (Nano Banana) was first. It drifted, hallucinated, and had no alpha. Transparency can be faked in a script or a Photoshop batch, but edges are cleaner when the model emits it. Switched to GPT Images 2.0 when the API shipped. GPT runs the three prompts in parallel; outputs land in Workspace / Raw.

### Common titles

Some customers wanted one title treatment across the catalog — more contrast, the character does the talking. The hard part is filling negative space and splitting the name across one, two, or three lines so it reads. If the original title art is readable and already in one to three lines, OCR keeps that split. If the read fails or the name runs past three lines, a Python splitter does the job, then the common title is generated into Workspace / Raw.

### Tune the layers

Background and title are light work: crop (models sometimes leave a white border), add title margin, resize. Foreground needs a point of interest.

People: detect mouths, take their bounding box, and sit that box on one horizontal axis. Crop transparent padding with the mouth as the anchor. No people: skip the vertical step if the subject is already cropped; otherwise align it on the same horizon. Then every layer is centered horizontally. A minimum face-size variable still controls how large the character sits.

*Foreground crop: mouths on one horizon, then center.*

```mermaid
flowchart TD
  fg[Foreground image]
  people{"Has people?"}
  detect[Detect mouth]
  bbox["Find mouths<br/>bounding box"]
  vAlignMouth["Vertical align mouth box<br/>along horizontal axis"]
  cropMouth["Crop transparent part<br/>with mouth as anchor"]
  cropped{"Cropped?"}
  vAlign["Vertical align along<br/>horizontal axis"]
  hCenter[Horizontal center align]
  fg --> people
  people -->|Yes| detect --> bbox --> vAlignMouth --> cropMouth --> hCenter
  people -->|No| cropped
  cropped -->|No| vAlign --> hCenter
  cropped -->|Yes| hCenter
```

![Foreground crops aligned on mouths versus already-cropped subjects](streaming-thumbnails/face-align.png)

*Same rules on different titles: mouths sit on one horizon; cropped subjects skip the vertical step, then everything centers.*

### Render

Composite every required ratio, size, format, skin, and filename. Background always fills. Character pastes in the center, never resized. Unique or common title sits bottom-center, and scales down when the frame is thinner than 1:1. Some skins get an underlay — a colored or black gradient for title contrast. Hue comes from the background: scale to 9×9 and read the center pixel. Bright art still fails white-on-light, so the pipeline picks among 16 hues on a full cycle that keep the same white-on-color contrast. Pillow does the rest.

![Wednesday key art across nine aspect ratios, from 1:2 to 2:1](streaming-thumbnails/different-aspect-ratio.png)

*Same geometry across nine ratios. Character stays centered; the title sits bottom-center and scales on thinner frames.*

![Stranger Things key art at tiny, small, medium, and large sizes](streaming-thumbnails/different-size.png)

*Four file sizes — tiny, small, medium, large — so each surface can trade quality for speed.*

*Character stays centered and is never resized.*

```mermaid
flowchart TD
  canvas[Create empty canvas]
  fill[Fill with background]
  addChar["Add character, centered"]
  underlayQ{Underlay?}
  blackQ{Black?}
  colored[Colored underlay]
  black[Black underlay]
  uniqueQ{Unique title?}
  commonTitle[Common title]
  uniqueTitle[Unique title]
  brandQ{Branding?}
  branding[Add branding]
  save[Save image]
  render["Workspace / Render"]

  canvas --> fill --> addChar --> underlayQ
  underlayQ -->|No| uniqueQ
  underlayQ -->|Yes| blackQ
  blackQ -->|No| colored --> uniqueQ
  blackQ -->|Yes| black --> uniqueQ
  uniqueQ -->|No| commonTitle --> brandQ
  uniqueQ -->|Yes| uniqueTitle --> brandQ
  brandQ -->|Yes| branding --> save
  brandQ -->|No| save
  save --> render
```

```widget
id: thumbnail-pipeline
```

### Local AI QA

Two checks: leftover transparent pixels in the title, and whether the render still matches the reference. Pixel counting is cheap. Image compare does not need to be fast — Gemma 4 via Ollama ran overnight, so the workstation never sat idle. Obsidian showed original vs render plus both scores. Sort the score column and the queue orders itself. A plugin runs a shell script from the vault, so the same board is the control panel.

![BoJack Horseman — catalog reference next to the pipeline render](streaming-thumbnails/reference-vs-render.png)

*Original vs render. Same character, title, and crop; the pipeline drops Netflix chrome.*

### Watchfolder delivery

The last hop is the easy one, and it can still be automatic. A watchfolder on the working directory uploads, notifies, syncs, and backs up.

## Solution

RAW lives under Workspace / Raw, keyed by movie ID: `background.png`, foreground, `unique_title.png`, `common_title.png`. Renders are named `skin_ratio_size.png`; references are `movie_id.png`. The vault stores name, split title, rendered poster, reference, QA title score, and QA match score.

## Impact

- Nearly 30,000 thumbnails in one year
- Hundreds of thousands of euros saved
- Catalog changes run the full chain without a manual fetch
