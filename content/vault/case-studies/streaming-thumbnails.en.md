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
title: Responsive Netflix-like thumbnails design cycle
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
- Faces on one horizon, silhouettes centered
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

n8n fires on a database change and runs the design chain. Production is the priority; the raw provider dump is secondary. Keeping that raw base current is what prevents a title from shipping without a poster.

*Poll production and pre-production; retry until new titles land in Workspace / RAW.*

```mermaid
flowchart TD
  preProd[(Pre-Production)]
  prod[(Production)]
  fetch[Fetch new movies]
  decision{New Movies}
  workspace["Workspace / RAW"]

  preProd --> fetch
  prod --> fetch
  workspace --> fetch
  fetch --> decision
  decision -->|"retry"| fetch
  decision -->|"found"| workspace
```

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

Consistency is the same deconstruction on every poster: foreground (person, animal, object), background, unique title. Each layer has its own prompt on the reference — background without type or a large subject; foreground uncropped on transparent; title at 2:1, also transparent. Gemini (Nano Banana) was first. It drifted, hallucinated, and had no alpha. Transparency can be faked in a script or a Photoshop batch, but edges are cleaner when the model emits it. Switched to GPT Images 2.0 when the API shipped.

*Parallel GPT generation of background, character, and unique title.*

```mermaid
flowchart TD
  refs["Workspace / References"]
  gpt["GPT images"]
  bg[Background]
  character[Character]
  uniqueTitle[Unique title]
  raw["Workspace / Raw"]

  refs --> gpt
  gpt --> bg --> raw
  gpt --> character --> raw
  gpt --> uniqueTitle --> raw
```

### Common titles

Some customers wanted one title treatment across the catalog — more contrast, the character does the talking. The hard part is filling negative space and splitting the name across one, two, or three lines so it reads. If the original title art is readable, OCR keeps that split. If it is not, a Python splitter does the job.

*Read the title from the reference; split when it runs past three strings.*

```mermaid
flowchart TD
  refs["Workspace / References"]
  diff["DIFF: New Movies"]
  read[Read reference image]
  readOk{"Successfully read title?"}
  threeStrings{"Is title up to 3 strings?"}
  split[Split title in strings]
  common[Generate common title]
  raw["Workspace / Raw"]

  refs --> read
  diff --> read
  read --> readOk
  readOk -->|No| split
  readOk -->|Yes| threeStrings
  threeStrings -->|No| split
  threeStrings -->|Yes| common
  split --> common
  common --> raw
```

### Tune the layers

Background and title are light work: crop (models sometimes leave a white border), add title margin, resize. Foreground needs a point of interest. Detect face and silhouette. All faces on one horizontal line; silhouettes in the center of the frame. Crop from those points with as little loss as possible. A minimum face-size variable controls how large the character sits.

*Resize background and title into Workspace / Raw.*

```mermaid
flowchart TD
  bg[Background]
  titleNode[Title]
  resizeBg[Resize]
  resizeTitle[Resize]
  raw["Workspace / Raw"]

  bg --> resizeBg --> raw
  titleNode --> resizeTitle --> raw
```

*Crop the character to face and body bounds.*

```mermaid
flowchart TD
  character[Character]
  face[Face bounds]
  body[Body bounds]
  crop[Crop]
  raw["Workspace / Raw"]

  character --> face --> crop
  character --> body --> crop
  crop --> raw
```

### Render

Composite every required ratio, size, format, skin, and filename. Background always fills. Character pastes in the center, never resized. Unique or common title sits bottom-center, and scales down when the frame is thinner than 1:1. Some skins get an underlay — a colored or black gradient for title contrast. Hue comes from the background: scale to 9×9 and read the center pixel. Bright art still fails white-on-light, so the pipeline picks among 16 hues on a full cycle that keep the same white-on-color contrast. Pillow does the rest.

*Each render walks aspect ratio, format, size, and skin.*

```mermaid
flowchart TD
  ratios[Aspect ratios]
  formats[Formats]
  sizes[Sizes]
  skins[Skins]
  ratios --> formats --> sizes --> skins
```

*Canvas compose with underlay, title, and branding branches. Character stays centered and is never resized.*

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

*Rendered poster vs reference via Gemma4.*

```mermaid
flowchart TD
  rendered[Rendered Poster]
  reference[Reference Poster]
  compare["Compare two images<br/>via Gemma4"]
  db[(Database)]

  rendered --> compare
  reference --> compare
  compare --> db
```

*Transparent-pixel count on the common title.*

```mermaid
flowchart TD
  titleNode[Common title]
  calc[Calculate transparent pixels]
  db[(Database)]

  titleNode --> calc --> db
```

### Watchfolder delivery

The last hop is the easy one, and it can still be automatic. A watchfolder on the working directory uploads, notifies, syncs, and backs up.

## Solution

RAW layers keyed by movie ID. Renders named by skin, ratio, and size. References and QA scores live in the Obsidian vault.

*Raw layers keyed by movie ID.*

```mermaid
flowchart TD
  workspace[Workspace]
  rawFolder[Raw]
  movieId[Movie ID]
  bg[background.png]
  fg[foreground]
  unique[unique_title.png]
  common[common_title.png]
  workspace --> rawFolder --> movieId --> bg --> fg --> unique --> common
```

*Obsidian vault: renders named by skin, ratio, and size; references by movie ID.*

```mermaid
flowchart TD
  vault[Obsidian Vault]
  renderFile["skin_ratio_size.png"]
  refFile[movie_id.png]
  vault --> renderFile --> refFile
```

*Vault database fields for titles, posters, and QA scores.*

```mermaid
flowchart TD
  name[Name]
  splitTitle[Split title]
  renderedPoster[Rendered poster]
  refField[Reference]
  qaTitle[QA title score]
  qaMatch[QA match score]
  name --> splitTitle --> renderedPoster --> refField --> qaTitle --> qaMatch
```

## Impact

- Nearly 30,000 thumbnails in one year
- Hundreds of thousands of euros saved
- Catalog changes run the full chain without a manual fetch
