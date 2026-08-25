import type { Locale } from "@/lib/i18n";
import {
  collectReferencesDiagram,
  commonTitleDiagram,
  composeRenderDiagram,
  generateAssetsDiagram,
  ingestTitlesDiagram,
  prepareLayersDiagram,
  qaCompareDiagram,
  qaTransparencyDiagram,
  workspaceDiagram,
} from "@/content/game-thumbnails-diagrams";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type CaseStudyDiagram = {
  source: string;
  caption?: LocalizedString;
};

export type CaseStudyProcessStep = {
  heading: LocalizedString;
  body: LocalizedString;
  diagrams: CaseStudyDiagram[];
};

export type CaseStudyEffort = {
  role: LocalizedString;
  constraints: LocalizedList;
  hard: LocalizedList;
};

export type CaseStudy = {
  slug: string;
  experienceId: string;
  title: LocalizedString;
  summary: LocalizedString;
  stack?: string[];
  context?: LocalizedString;
  problem?: LocalizedString;
  effort?: CaseStudyEffort;
  process?: LocalizedList;
  processSteps?: CaseStudyProcessStep[];
  solution?: LocalizedString;
  solutionItems?: LocalizedList;
  solutionDiagram?: CaseStudyDiagram;
  impact?: LocalizedList;
  relatedSlugs?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "game-thumbnails",
    experienceId: "spribe",
    title: {
      en: "Game Thumbnails Design Cycle using AI",
      by: "Дызайн-цыкл гульнявых тамбнейлаў з AI",
    },
    summary: {
      en: "Automated generation of game thumbnails with Python and AI image-editing workflows — scaling asset production for the product platform.",
      by: "Аўтаматычная генерацыя прэв'ю гульняў з дапамогай Python і AI-рэдагавання выяў — маштабаванне вытворчасці асетаў для прадуктовай платформы.",
    },
    stack: ["Python", "OpenAI", "Gemma", "Obsidian"],
    context: {
      en: "The product platform ships new titles from two catalogs — pre-production and production. Each one needs a poster, layered assets, and many thumbnail variants.",
      by: "Прадуктовая платформа выпускае новыя назвы з двух каталогаў — pre-production і production. Кожнай патрэбны постар, слаі асетаў і шмат варыянтаў тамбнейлаў.",
    },
    problem: {
      en: "Hand-building each poster in Photoshop did not scale. Missing posters, titles past three lines, and per-skin / per-ratio renders were the bottleneck.",
      by: "Ручная зборка кожнага постара ў Photoshop не маштабавалася. Дзіркі ў постарах, назвы даўжэй за тры радкі і рэндэры пад кожны скін і суадносіны — вузкае месца.",
    },
    effort: {
      role: {
        en: "Lead Graphic Design, Design Engineer",
        by: "Lead Graphic Design, Design Engineer",
      },
      constraints: {
        en: [
          "Two catalogs feeding one workspace",
          "Posters not always on IMDB or the official site",
          "Title layout capped at three lines",
          "Combinatorial outputs: aspect ratios, formats, sizes, skins",
        ],
        by: [
          "Два каталогі ў адну працоўную прастору",
          "Постараў няма на IMDB ці афіцыйным сайце",
          "Макет назвы — да трох радкоў",
          "Камбінацыі: суадносіны, фарматы, памеры, скіны",
        ],
      },
      hard: {
        en: [
          "Reading titles off reference art",
          "Cropping characters to face and body bounds without resizing on the canvas",
          "Scoring renders against references",
        ],
        by: [
          "Зчытваць назвы з рэферэнсаў",
          "Абразка персанажа па твары і целе без рэсайзу на палатне",
          "Ацэнка рэндэраў супраць рэферэнсаў",
        ],
      },
    },
    processSteps: [
      {
        heading: {
          en: "Ingest titles",
          by: "Збор назваў",
        },
        body: {
          en: "Poll pre-production and production. If nothing new, retry. New titles land in Workspace / RAW.",
          by: "Апытанне pre-production і production. Калі нічога новага — паўтор. Новыя назвы трапляюць у Workspace / RAW.",
        },
        diagrams: [
          {
            source: ingestTitlesDiagram,
            caption: {
              en: "Catalog poll into Workspace / RAW, with a retry loop when nothing new is found.",
              by: "Апытанне каталогаў у Workspace / RAW, з паўторам калі нічога новага няма.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Collect references",
          by: "Збор рэферэнсаў",
        },
        body: {
          en: "For each new title, try IMDB, then the official site, then Google Images. The first poster found is downloaded to Workspace / References.",
          by: "Для кожнай новай назвы: IMDB, потым афіцыйны сайт, потым Google Images. Першы знойдзены постар — у Workspace / References.",
        },
        diagrams: [
          {
            source: collectReferencesDiagram,
            caption: {
              en: "Poster fallback: IMDB, official site, then Google Images.",
              by: "Фолбэк постара: IMDB, афіцыйны сайт, потым Google Images.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Generate assets",
          by: "Генерацыя асетаў",
        },
        body: {
          en: "References go through OpenAI GPT images. Background, character, and unique title generate in parallel into Workspace / Raw.",
          by: "Рэферэнсы ідуць праз OpenAI GPT images. Фон, персанаж і ўнікальная назва генеруюцца паралельна ў Workspace / Raw.",
        },
        diagrams: [
          {
            source: generateAssetsDiagram,
            caption: {
              en: "Parallel GPT generation of background, character, and unique title.",
              by: "Паралельная GPT-генерацыя фону, персанажа і ўнікальнай назвы.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Common title",
          by: "Агульная назва",
        },
        body: {
          en: "Read the title from the reference. If that fails or it runs past three strings, split it, then generate a common title into Raw.",
          by: "Зчытаць назву з рэферэнса. Калі не атрымалася ці больш за тры радкі — разбіць, потым згенераваць агульную назву ў Raw.",
        },
        diagrams: [
          {
            source: commonTitleDiagram,
            caption: {
              en: "Title read from the reference, split when longer than three strings.",
              by: "Назва з рэферэнса, разбітая калі даўжэй за тры радкі.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Prepare layers",
          by: "Падрыхтоўка слаёў",
        },
        body: {
          en: "Resize background and title. Detect face and body bounds on the character, then crop to the zone of interest.",
          by: "Рэсайз фону і назвы. Дэтэкт межаў твару і цела персанажа, потым кроп да зоны цікавасці.",
        },
        diagrams: [
          {
            source: prepareLayersDiagram,
            caption: {
              en: "Resize background and title; crop the character to face and body bounds.",
              by: "Рэсайз фону і назвы; кроп персанажа па межах твару і цела.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Compose and render",
          by: "Кампазіцыя і рэндэр",
        },
        body: {
          en: "For each aspect ratio, format, size, and skin: empty canvas, background, centered character without resize. Optional underlay, unique or common title, optional branding. Save to Workspace / Render.",
          by: "Для кожных суадносін, фармату, памеру і скіна: пустое палатно, фон, персанаж па цэнтры без рэсайзу. Падкладка па патрэбе, унікальная ці агульная назва, брэндынг. Захаваць у Workspace / Render.",
        },
        diagrams: [
          {
            source: composeRenderDiagram,
            caption: {
              en: "Canvas compose across configs, with underlay, title, and branding branches.",
              by: "Кампазіцыя на палатне па канфігах, з галінамі падкладкі, назвы і брэндынгу.",
            },
          },
        ],
      },
      {
        heading: {
          en: "QA",
          by: "Кантроль якасці",
        },
        body: {
          en: "Gemma4 compares the rendered poster to the reference. Transparent pixels on the common title are counted. Both scores go to the database.",
          by: "Gemma4 параўноўвае рэндэр з рэферэнсам. Падлік празрыстых пікселяў на агульнай назве. Абодва балы — у базу.",
        },
        diagrams: [
          {
            source: qaCompareDiagram,
            caption: {
              en: "Rendered poster vs reference via Gemma4.",
              by: "Рэндэр супраць рэферэнса праз Gemma4.",
            },
          },
          {
            source: qaTransparencyDiagram,
            caption: {
              en: "Transparent-pixel count on the common title.",
              by: "Падлік празрыстых пікселяў на агульнай назве.",
            },
          },
        ],
      },
    ],
    solution: {
      en: "A Python workspace: RAW layers keyed by movie ID, renders named by skin / ratio / size, references and QA scores in an Obsidian vault.",
      by: "Python-прастора: слаі RAW па movie ID, рэндэры з імем скін / суадносіны / памер, рэферэнсы і QA-балы ў сховішчы Obsidian.",
    },
    solutionDiagram: {
      source: workspaceDiagram,
      caption: {
        en: "Workspace layout: Raw assets per movie ID, Obsidian vault for renders, references, and QA fields.",
        by: "Макет прасторы: Raw-асеты па movie ID, сховішча Obsidian для рэндэраў, рэферэнсаў і QA-палёў.",
      },
    },
    impact: {
      en: [
        "New titles land in RAW without a manual ingest",
        "References collected through IMDB → official site → Google Images",
        "Background, character, and unique title generated in parallel",
        "Common titles follow the three-line split",
        "QA scores stored with each render in the vault",
      ],
      by: [
        "Новыя назвы трапляюць у RAW без ручнога збору",
        "Рэферэнсы: IMDB → афіцыйны сайт → Google Images",
        "Фон, персанаж і ўнікальная назва генеруюцца паралельна",
        "Агульныя назвы — па правіле трох радкоў",
        "QA-балы захоўваюцца з кожным рэндэрам у сховішчы",
      ],
    },
  },
  {
    slug: "chameleon-illustrations",
    experienceId: "spribe",
    title: {
      en: "Chameleon Illustrations System",
      by: "Сістэма ілюстрацый Chameleon",
    },
    summary: {
      en: "Illustration set for the Chameleon product line, aligned with platform visual language and brand.",
      by: "Набор ілюстрацый для лінейкі Chameleon, узгоднены з візуальнай мовай платформы і брэндам.",
    },
  },
  {
    slug: "psd-parser",
    experienceId: "cybercradle",
    title: {
      en: "Photoshop-based level design",
      by: "Левел-дызайн на базе Photoshop",
    },
    summary: {
      en: "Photoshop-to-game-engine automation: parsing PSD files to cut manual asset prep and speed delivery from design to engine.",
      by: "Аўтаматызацыя Photoshop → game engine: парсінг PSD, каб скараціць ручную падрыхтоўку асетаў і паскорыць дастаўку ў рухавік.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function hasCaseStudyBody(study: CaseStudy): boolean {
  return Boolean(
    study.context ||
      study.problem ||
      study.effort ||
      study.process ||
      study.processSteps?.length ||
      study.solution ||
      study.solutionItems ||
      study.solutionDiagram ||
      study.impact,
  );
}

export function getCaseStudiesForIndex(): CaseStudy[] {
  return [...caseStudies].sort(
    (a, b) => Number(hasCaseStudyBody(b)) - Number(hasCaseStudyBody(a)),
  );
}

export function getRelatedCaseStudies(study: CaseStudy): CaseStudy[] {
  if (!study.relatedSlugs?.length) return [];
  return study.relatedSlugs
    .filter((slug) => slug !== study.slug)
    .map((slug) => getCaseStudy(slug))
    .filter((related): related is CaseStudy => related !== undefined);
}
