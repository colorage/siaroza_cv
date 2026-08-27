---
type: case-study
slug: chameleon-illustrations
order: 1
experienceId: amasty
needs_translation: false
stack:
  - Blender
locale: en
title: Chameleon illustrations for Shopify themes
summary: >-
  Theme builder for Shopify: merchants set primary and secondary colors, and pick an illustration style. Vectors recolor
  with variables. 3D needed a 16×16 render matrix and a hex postfix so the store loaded the matching pair.
---

## Context

The product was a theme builder for Shopify stores. Clients wanted more than a two-color setup — they wanted illustrations that belonged to the shop, in a style they chose.

Flat vector art recolors in one pass with theme variables. The real constraint is 3D: a render is a baked image. Primary and secondary have to live in the scene, then every pair has to be rendered, named, and served.
## Effort

**Duration.** Multi-month

**Role.** UI & Visual Designer

**Team.** Solo

### Constraints

- Theme colors are a primary–secondary pair
- Vectors recolor with variables; 3D renders cannot
- 16 hues × 16 hues = 256 renders per illustration

### What was hard

- Art that still reads after both colors swap
- Iterate the pair in Blender, then render the full matrix
- A storefront lookup with no filename database

*From palette pick to the matching PNG.*

```mermaid
flowchart TD
  merchant["Merchant picks colors<br/>and illustration style"]
  vector{"Flat vector?"}
  vars["Recolor with theme variables"]
  blender["Build in Blender<br/>primary plus secondary"]
  iterate["Iterate the color pair"]
  matrix["Render 16x16 matrix"]
  postfix["Name with 0-F postfix"]
  load["Store loads matching PNG"]
  merchant --> vector
  vector -->|yes| vars
  vector -->|no| blender
  blender --> iterate --> matrix --> postfix --> load
```

## Process

### Two kinds of art

Merchants picked illustration style as well as colors. Flat vectors follow the theme in one step: swap the variables. 3D does not. A render is pixels; the pair has to be in the file.

### Design in Blender

Illustrations were built with primary and secondary as materials. Iterate the pair in-scene until both colors still read — then batch. No recolor after the render.

### 16×16 matrix

A custom plugin rendered every pair. Sixteen hues on each axis: 256 files per illustration. That is the cost of 3D that still matches the theme.

### Hex postfix

Colors marked 0–F. The pair is the filename suffix. shopping_cart_a2.png is the Blue–Amber theme. The store builds the name from the palette it already has; no lookup table.

*The pair is the filename: shopping_cart_a2.png is Blue–Amber.*

```mermaid
flowchart TD
  primary["Primary 0-F"]
  secondary["Secondary 0-F"]
  file["shopping_cart_a2.png"]
  theme["Blue-Amber theme"]
  primary --> file
  secondary --> file
  file --> theme
```

## Solution

Pre-rendered matrix plus a postfix lookup. The store loads the PNG. No runtime recolor on the 3D art.

## Impact

- 256 colorways per 3D illustration without hand-export
- Storefront resolve is a postfix, not a table
- 3D art matches the palette the merchant already set
