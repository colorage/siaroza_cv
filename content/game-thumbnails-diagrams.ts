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
  gpt["Process via OpenAI<br/>GPT images"]
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

export const composeConfigDiagram = `flowchart TD
  subgraph config [Config]
    ratios[Aspect ratios]
    formats[Formats]
    sizes[Sizes]
    skins[Skins]
    ratios --> formats --> sizes --> skins
  end
`;

export const composeRenderDiagram = `flowchart TD
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
`;

export const qaCompareDiagram = `flowchart TD
  rendered[Rendered Poster]
  reference[Reference Poster]
  compare["Compare two images<br/>via Gemma4"]
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

export const workspaceRawDiagram = `flowchart TD
  workspace[Workspace]
  subgraph rawFolder [Raw]
    movieId[Movie ID]
    bg[background.png]
    fg[foreground]
    unique[unique_title.png]
    common[common_title.png]
    movieId --> bg --> fg --> unique --> common
  end
  workspace --> rawFolder
`;

export const workspaceVaultDiagram = `flowchart TD
  subgraph vault [Obsidian Vault]
    subgraph renderFolder [Render]
      renderFile["skin_ratio_size.png"]
    end
    subgraph referenceFolder [Reference]
      refFile[movie_id.png]
    end
    renderFolder --> referenceFolder
  end
`;

export const workspaceDatabaseDiagram = `flowchart TD
  subgraph database [Database]
    name[Name]
    splitTitle[Split title]
    renderedPoster[Rendered poster]
    refField[Reference]
    qaTitle[QA title score]
    qaMatch[QA match score]
    name --> splitTitle --> renderedPoster --> refField --> qaTitle --> qaMatch
  end
`;
