import type { Locale } from "@/lib/i18n";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type CaseStudyEffort = {
  duration: LocalizedString;
  role: LocalizedString;
  team: LocalizedString;
  constraints: LocalizedList;
  hard: LocalizedList;
};

export type CaseStudySection = {
  title: LocalizedString;
  body?: LocalizedString;
  items?: LocalizedList;
};

export type CaseStudyDiagram = {
  source: string;
  title?: LocalizedString;
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
  sections?: CaseStudySection[];
  diagrams?: CaseStudyDiagram[];
  solution?: LocalizedString;
  solutionItems?: LocalizedList;
  impact?: LocalizedList;
  relatedSlugs?: string[];
};

const streamingPipeline = `flowchart TD
  change[Catalog change]
  n8n[n8n trigger]
  prod[Production DB]
  raw[Pre-release DB]
  todo["Diff: missing posters"]
  refs[Public references]
  layers[AI layers]
  titles[Title layout]
  crop[POI crop]
  render[Composite]
  qa[Local QA]
  ship[Watchfolder]
  change --> n8n
  n8n --> prod
  n8n --> raw
  prod --> todo
  raw --> todo
  todo --> refs
  refs --> layers
  layers --> titles
  layers --> crop
  titles --> render
  crop --> render
  render --> qa
  qa --> ship`;

export const caseStudies: CaseStudy[] = [
  {
    slug: "streaming-thumbnails",
    experienceId: "spribe",
    title: {
      en: "Responsive Netflix-like thumbnails design cycle",
      by: "Дызайн-цыкл адаптыўных тамбнейлаў у стылі Netflix",
    },
    summary: {
      en: "Thumbnail system for a B2B movie aggregator — one geometry, several skins and ratios, four file sizes. Nearly 30,000 posters in a year.",
      by: "Сістэма тамбнейлаў для B2B-агрэгатара фільмаў — адна геаметрыя, некалькі скінаў і прапорцый, чатыры памеры файла. Амаль 30 000 постераў за год.",
    },
    stack: ["Python", "Pillow", "n8n", "GPT Images", "Obsidian", "Ollama"],
    context: {
      en: "The platform was a B2B streaming aggregator. Every title needed posters that could land in any layout: the same geometry so the grid held together, several skins, several aspect ratios, and png, webp, or progressive jpeg at big, medium, small, and tiny — so each surface could trade quality for speed.",
      by: "Платформа была B2B-агрэгатарам стрымінгу. Кожны тытул патрабаваў постараў пад любы макет: адна геаметрыя, каб сетка трымалася, некалькі скінаў, некалькі прапорцый, і png, webp або progressive jpeg у big, medium, small і tiny — каб кожная паверхня магла мяняць якасць на хуткасць.",
    },
    problem: {
      en: "The catalog never stood still. New providers joined; ones already on the pipe dropped premieres. Manual fetch was too slow. The chain had to watch production first and the pre-release dump second: work on raw data early is what stops missing posters when a title goes live.",
      by: "Каталог не стаяў. Падключаліся новыя правайдары; ужо падключаныя дадавалі прэм'еры. Ручны збор не паспяваў. Пайплайн мусіў глядзець спачатку прадакшн, потым pre-release сырую базу: ранняя праца з сырымі данымі — тое, што не дае тытулу выйсці без постара.",
    },
    effort: {
      duration: { en: "1 year", by: "1 год" },
      role: { en: "Design Engineer", by: "Design Engineer" },
      team: { en: "Solo", by: "Аднаасобна" },
      constraints: {
        en: [
          "Catalog grew from new providers and premieres",
          "Provider originals arrived slowly, in mixed formats",
          "Public catalogs sat behind Cloudflare",
          "Early image models drifted in style and had no native transparency",
        ],
        by: [
          "Каталог рос ад новых правайдараў і прэм'ер",
          "Арыгіналы ад правайдара прыходзілі павольна і ў розных фарматах",
          "Публічныя каталогі стаялі за Cloudflare",
          "Раннія мадэлі збіваліся са стылю і не мелі роднай празрыстасці",
        ],
      },
      hard: {
        en: [
          "Same crop and geometry rules across tens of thousands of titles",
          "Titles fitted into one, two, or three lines of negative space",
          "Faces on one horizon, silhouettes centered",
          "Type readable on bright art",
        ],
        by: [
          "Адны правілы кропу і геаметрыі на дзясяткі тысяч тытулаў",
          "Назвы ў адзін, два або тры радкі негатыўнай прасторы",
          "Твары на адной гарызанталі, сілуэты па цэнтры",
          "Тытр чытэльны на светлым арце",
        ],
      },
    },
    diagrams: [
      {
        source: streamingPipeline,
        title: {
          en: "From catalog change to delivery.",
          by: "Ад змены каталога да дастаўкі.",
        },
      },
    ],
    sections: [
      {
        title: {
          en: "Fetch the catalog",
          by: "Падцягнуць каталог",
        },
        body: {
          en: "n8n fires on a database change and runs the design chain. Production is the priority; the raw provider dump is secondary. Keeping that raw base current is what prevents a title from shipping without a poster.",
          by: "n8n спрацоўвае на змену ў базе і запускае дызайн-ланцуг. Прадакшн — прыярытэт; сырая база правайдара — другая. Трымаць гэтую сырую базу актуальнай — тое, што не дае тытулу выйсці без постара.",
        },
      },
      {
        title: {
          en: "Gather references",
          by: "Зібраць рэферэнсы",
        },
        body: {
          en: "Diff the catalog against the local store and the to-do list appears: titles with no poster. Provider files were a poor automation source — slow, a different format every time. Public stills first: IMDb and Rotten Tomatoes cover most of the catalog; region-specific and niche films come from the official site or image search. Playwright died on Cloudflare. Chrome CDP, with one human pass per session, did not. References lived in Obsidian.",
          by: "Параўнанне каталога з лакальным сховішчам — і з'яўляецца to-do: тытулы без постара. Файлы правайдара дрэнна аўтаматызуюцца: павольна, кожны раз іншы фармат. Спачатку публічныя кадры: IMDb і Rotten Tomatoes пакрываюць большасць каталога; рэгіянальныя і нішавыя фільмы — з афіцыйнага сайта або пошуку выяў. Playwright не праходзіў Cloudflare. Chrome CDP, з адным чалавечым праходам на сесію, праходзіў. Рэферэнсы жылі ў Obsidian.",
        },
      },
      {
        title: {
          en: "Generate layers",
          by: "Згенераваць слаі",
        },
        body: {
          en: "Consistency is the same deconstruction on every poster: foreground (person, animal, object), background, unique title. Each layer has its own prompt on the reference — background without type or a large subject; foreground uncropped on transparent; title at 2:1, also transparent. Gemini (Nano Banana) was first. It drifted, hallucinated, and had no alpha. Transparency can be faked in a script or a Photoshop batch, but edges are cleaner when the model emits it. Switched to GPT Images 2.0 when the API shipped.",
          by: "Кансістэнтнасць — адна і тая ж дэканструкцыя кожнага постара: пярэдні план (чалавек, жывёла, аб'ект), фон, унікальны тытр. Кожны слой мае ўласны промпт да рэферэнса — фон без надпісу і буйнога аб'екта; пярэдні план не абрэзаны, на празрыстым; тытр 2:1, таксама празрысты. Спачатку быў Gemini (Nano Banana). Ён збіваўся са стылю, галюцынаваў і не меў альфы. Празрыстасць можна зрабіць скрыптам або Photoshop batch, але краі чысцейшыя, калі мадэль аддае яе сама. Перайшоў на GPT Images 2.0, калі з'явілася API.",
        },
      },
      {
        title: {
          en: "Common titles",
          by: "Агульны тытр",
        },
        body: {
          en: "Some customers wanted one title treatment across the catalog — more contrast, the character does the talking. The hard part is filling negative space and splitting the name across one, two, or three lines so it reads. If the original title art is readable, OCR keeps that split. If it is not, a Python splitter does the job.",
          by: "Некаторым кліентам агрэгатара патрэбны быў адзін тытр на ўвесь каталог — больш кантрасту, герой трымае ўвагу. Складанае — запоўніць негатыўную прастору і падзяліць назву на адзін, два або тры радкі так, каб яна чыталася. Калі арыгінальны тытр чытэльны, OCR захоўвае гэты падзел. Калі не — Python-скрыпт.",
        },
      },
      {
        title: {
          en: "Tune the layers",
          by: "Падладзіць слаі",
        },
        body: {
          en: "Background and title are light work: crop (models sometimes leave a white border), add title margin, resize. Foreground needs a point of interest. Detect face and silhouette. All faces on one horizontal line; silhouettes in the center of the frame. Crop from those points with as little loss as possible. A minimum face-size variable controls how large the character sits.",
          by: "Фон і тытр — лёгкая праца: кроп (мадэлі часам пакідаюць белую рамку), водступ для тытра, рэсайз. Пярэдні план патрабуе кропкі цікавасці. Дэтэкт твару і сілуэту. Усе твары на адной гарызанталі; сілуэты ў цэнтры кадра. Кроп ад гэтых кропак з мінімальнай стратай. Пераменная мінімальнага памеру твару кантралюе, наколькі буйны герой.",
        },
      },
      {
        title: {
          en: "Render",
          by: "Рэндэр",
        },
        body: {
          en: "Composite every required ratio, size, format, skin, and filename. Background always fills. Character pastes in the center, never resized. Unique or common title sits bottom-center, and scales down when the frame is thinner than 1:1. Some skins get an underlay — a colored or black gradient for title contrast. Hue comes from the background: scale to 9×9 and read the center pixel. Bright art still fails white-on-light, so the pipeline picks among 16 hues on a full cycle that keep the same white-on-color contrast. Pillow does the rest.",
          by: "Складае кожную патрэбную прапорцыю, памер, фармат, скін і імя файла. Фон заўсёды запаўняе кадр. Герой у цэнтры, без рэсайзу. Унікальны або агульны тытр — унізе па цэнтры; памяншаецца, калі кадр вузейшы за 1:1. Некаторыя скіны маюць падкладку — каляровы або чорны градыент для кантрасту тытра. Адценне з фону: маштаб да 9×9 і колер цэнтральнага пікселя. На светлым арце белае ўсё роўна правальваецца, таму пайплайн выбірае з 16 адценняў поўнага кола з тым жа кантрастам белага на колеры. Астатняе — Pillow.",
        },
      },
      {
        title: {
          en: "Local AI QA",
          by: "Лакальны AI QA",
        },
        body: {
          en: "Two checks: leftover transparent pixels in the title, and whether the render still matches the reference. Pixel counting is cheap. Image compare does not need to be fast — Gemma 4 via Ollama ran overnight, so the workstation never sat idle. Obsidian showed original vs render plus both scores. Sort the score column and the queue orders itself. A plugin runs a shell script from the vault, so the same board is the control panel.",
          by: "Дзве праверкі: колькі празрыстых пікселяў засталося ў тытры, і ці супадае рэндэр з рэферэнсам. Падлік пікселяў — проста. Параўнанне выяў не мусіць быць хуткім — Gemma 4 праз Ollama ішла ноччу, станцыя не прастойвала. У Obsidian — арыгінал і рэндэр плюс абодва балы. Сартаванне па бале само складае чаргу. Плагін запускае shell-скрыпт са сховішча, таму тая ж дошка — і панэль кіравання.",
        },
      },
      {
        title: {
          en: "Watchfolder delivery",
          by: "Дастаўка праз watchfolder",
        },
        body: {
          en: "The last hop is the easy one, and it can still be automatic. A watchfolder on the working directory uploads, notifies, syncs, and backs up.",
          by: "Апошні крок самы просты, і яго таксама можна аўтаматызаваць. Watchfolder на рабочай папцы загружае, апавяшчае, сінхранізуе і робіць бэкап.",
        },
      },
    ],
    impact: {
      en: [
        "Nearly 30,000 thumbnails in one year",
        "Hundreds of thousands of euros saved",
        "Catalog changes run the full chain without a manual fetch",
      ],
      by: [
        "Амаль 30 000 тамбнейлаў за год",
        "Зэканомленыя сотні тысяч еўра",
        "Змены каталога запускаюць увесь ланцуг без ручнога збору",
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
      study.sections?.length ||
      study.diagrams?.length ||
      study.solution ||
      study.solutionItems ||
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
