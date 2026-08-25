export const ingestTitlesDiagram = `flowchart TD
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
`;

export const collectReferencesDiagram = `flowchart TD
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
`;

export const generateAssetsDiagram = `flowchart TD
  refs["Workspace / References"]
  gpt[Process via OpenAI GPT images]
  bg[Generate background]
  character[Generate character]
  uniqueTitle[Generate unique title]
  raw["Workspace / Raw"]

  refs --> gpt
  gpt --> bg
  gpt --> character
  gpt --> uniqueTitle
  bg --> raw
  character --> raw
  uniqueTitle --> raw
`;

export const commonTitleDiagram = `flowchart TD
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
`;

export const prepareLayersDiagram = `flowchart TD
  bg["Background"]
  character["Character"]
  titleNode["Title"]
  resizeBg[Resize]
  face[Detect Face bounds]
  body[Detect Body bounds]
  crop[Crop to zone of interest]
  resizeTitle[Resize]
  raw["Workspace / Raw"]

  bg --> resizeBg --> raw
  character --> face --> crop
  character --> body --> crop
  crop --> raw
  titleNode --> resizeTitle --> raw
`;

export const composeRenderDiagram = `flowchart TD
  subgraph config [Config]
    direction LR
    ratios[Aspect ratios]
    formats[Formats]
    sizes[Sizes]
    skins[Skins]
  end
  canvas[Create empty canvas]
  fill[Fill with background]
  addChar["Add character. Center aligned. Do not resize"]
  underlayQ{Underlay required?}
  blackQ{Black underlay?}
  colored[Add colored underlay]
  black[Add black underlay]
  uniqueQ{Unique title?}
  commonTitle[Add common title]
  uniqueTitle[Add unique title]
  brandQ{Branding required?}
  branding[Add branding]
  save[Save image]
  render["Workspace / Render"]

  config --> canvas
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
`;

export const qaCompareDiagram = `flowchart TD
  rendered[Rendered Poster]
  reference[Reference Poster]
  compare[Compare two images via Gemma4]
  db[(Database)]

  rendered --> compare
  reference --> compare
  compare --> db
`;

export const qaTransparencyDiagram = `flowchart TD
  titleNode[Common title]
  calc[Calculate transparent pixels]
  db[(Database)]

  titleNode --> calc --> db
`;

export const workspaceDiagram = `flowchart TD
  workspace[Workspace]
  raw[Raw]
  movieId[Movie ID]
  bg[background.png]
  fg[foreground]
  unique[unique_title.png]
  common[common_title.png]
  vault[Obsidian Vault]
  render[Render]
  renderFile["movie_id_#91;skin#93;_#91;aspect_ratio#93;_#91;size#93;_.png"]
  reference[Reference]
  refFile[movie_id.png]
  subgraph database [Database]
    direction TB
    name[Name]
    splitTitle[Split title]
    renderedPoster[Rendered Poster]
    refField[Reference]
    qaTitle[QA Title Score]
    qaMatch[QA Match Score]
  end

  workspace --> raw --> movieId
  movieId --> bg
  movieId --> fg
  movieId --> unique
  movieId --> common
  workspace --> vault
  vault --> render --> renderFile
  vault --> reference --> refFile
  vault --> database
`;
