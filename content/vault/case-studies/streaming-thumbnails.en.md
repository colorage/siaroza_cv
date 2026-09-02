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
title: Streaming thumbnail pipeline
cover: streaming-thumbnails/different-aspect-ratio.png
summary: >-
  A design system and rendering pipeline for a B2B streaming aggregator: about 30,000 titles, eight skins, nine aspect
  ratios, four sizes, and three formats — 864 outputs per title from reusable layers.
---

```widget
id: thumbnail-pipeline
```

## Context

The platform needed posters that behaved like one system across different surfaces, not a collection of one-off illustrations. Each title could appear in nine aspect ratios and four file sizes, with either an original title treatment or one common treatment across a customer's catalog. The problem was not making one poster; it was defining rules that survived every format.

The examples below are catalog titles from the aggregator, not a Netflix product.

I built the system around catalog changes. New providers joined and existing ones added premieres, so the pipeline checked production first and the pre-release source second. Keeping the raw source current prevented a title from going live without a poster.

![n8n canvas — hourly generation, manual render and upload, daily QA](streaming-thumbnails/n8n-workflow.png)

*n8n runs the repeatable steps: hourly fetch and generation, a manual render-and-upload checkpoint, and daily QA.*

## Effort

**Duration.** 1 year

**Role.** Design Engineer

**Team.** Solo

### Constraints

- Catalog grew from new providers and premieres
- Provider originals arrived slowly, in mixed formats
- Early image models drifted in style and had no native transparency

### What required judgment

- AI-generated layers arrived without a shared coordinate system; inconsistent anchors made the grid feel unstable
- A common title treatment had to remain legible in a one- to three-line area across ratios
- White type needed contrast without flattening the artwork
- Automation had to preserve human review for visual decisions and edge cases

## Process

fetch → parse → generate → crop → render → QA → upload

### Detect missing titles

I connected the pipeline to catalog updates with n8n. It checked production first, then the pre-release source, and retried until new titles landed in Workspace / RAW. A catalog diff produced the queue of titles without posters. When provider files were slow or inconsistent, public stills filled the gap and references lived in Obsidian.

### Generate reusable layers

I treated each poster as the same three-part composition: background, foreground, and title. Separate prompts made the layers reusable. Gemini was an early attempt; style drift and missing transparency made it brittle, so I moved to GPT Images 2.0 when the API shipped. Three layer requests ran in parallel, with outputs landing in Workspace / Raw.

### Separate title logic from rendering

Some customers needed the original title art; others needed one common treatment across the catalog. OCR preserved a readable title split across one to three lines. When the read failed or the name ran longer, a Python fallback split it before the common title was generated. Title extraction stayed separate from layout.

### Normalize composition

To stop foregrounds from drifting, I detected mouths in human subjects, aligned their bounding box to a shared horizontal axis, cropped transparent padding from that mouth anchor, and then centered each layer. Already-cropped subjects without people skipped the vertical alignment step. One face-size parameter controlled the character's perceived scale — the same decision as shot scale, from a face close-up to a full figure.

![Framing types of shots in film — nested crop boxes from extreme close-up to full shot](streaming-thumbnails/shot-framing-guide.png)

*Shot scale is the crop: how much of the figure sits in the frame. [Types of shots in film](https://murphy.inc/types-of-shots-in-film-storyboarding/).*

![Foreground alignment across titles — shared mouth anchor, then horizontal centering](streaming-thumbnails/face-align.png)

*One anchor rule across different foregrounds: mouths share a horizon, then the layer is centered.*

### Render the output matrix

Pillow composed eight skins × nine ratios × four sizes × three formats from the same layers. The background filled the frame; the foreground stayed centered and unscaled; the original or common title sat bottom-center and reduced on narrow ratios. Underlays and contrast-safe hue selection kept white type readable on bright art.

### QA and delivery

Two checks covered the fragile parts: transparent pixels left in the title, and a comparison against the reference for character, title, and crop — not a pixel-perfect copy of the marketing still. Gemma 4 via Ollama could run overnight, while Obsidian showed the queue and both scores. A plugin launched the shell script, and a watchfolder uploaded, notified the team in Slack, synced, and backed up the result. Human review stayed focused on layers, visual decisions, and edge cases.

![BoJack Horseman — catalog reference next to the pipeline render](streaming-thumbnails/reference-vs-render.png "fit")

*Reference versus render. The same character, title, and crop — without copying the Netflix branding. The catalog skin is louder on purpose.*

## Outcome

- About 30,000 original titles processed in one year
- 864 deliverables per title — 8 skins × 9 ratios × 4 sizes × 3 formats — roughly 26 million files across the catalog
- Catalog changes started the pipeline automatically; human attention moved to layer decisions, visual QA, and exceptions
- The result was a reusable system for new titles, not a one-off batch of artwork
