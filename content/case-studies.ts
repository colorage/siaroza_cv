import type { Locale } from "@/lib/i18n";
import {
  collectReferencesDiagram,
  commonTitleDiagram,
  composeConfigDiagram,
  composeRenderDiagram,
  generateAssetsDiagram,
  ingestTitlesDiagram,
  prepareBackgroundTitleDiagram,
  prepareCharacterDiagram,
  qaCompareDiagram,
  qaTransparencyDiagram,
  workspaceDatabaseDiagram,
  workspaceRawDiagram,
  workspaceVaultDiagram,
} from "@/content/game-thumbnails-diagrams";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type CaseStudyEffort = {
  duration: LocalizedString;
  role: LocalizedString;
  team: LocalizedString;
  constraints: LocalizedList;
  hard: LocalizedList;
};

export type CaseStudyDiagram = {
  source: LocalizedString;
  title?: LocalizedString;
};

export type CaseStudySection = {
  title: LocalizedString;
  body?: LocalizedString;
  items?: LocalizedList;
  diagrams?: CaseStudyDiagram[];
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
  solutionDiagrams?: CaseStudyDiagram[];
  impact?: LocalizedList;
  relatedSlugs?: string[];
};

function enChart(source: string, title: LocalizedString): CaseStudyDiagram {
  return { source: { en: source, by: source }, title };
}

const streamingPipeline: LocalizedString = {
  en: `flowchart TD
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
  upload --> notifyTeam`,
  by: `flowchart TD
  fetch["Атрымаць новыя<br/>фільмы з базы"]
  parse["Разабраць каталогі<br/>для рэферэнсу"]
  generate["Згенераваць ассеты"]
  edit["Рэдагаваць ассеты"]
  visual["Візуальная праверка"]
  render["Адрэндэрыць ассеты"]
  upload["Заліць у базу"]
  notifyMe["Паведаміць мне ў Slack"]:::notify
  qa["QA-тэсты"]
  notifyTeam["Паведаміць каманду<br/>ў Slack"]:::notify
  fetch --> parse --> generate --> edit --> visual --> render --> upload
  edit --> notifyMe
  render --> qa
  upload --> notifyTeam`,
};

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
        diagrams: [
          enChart(ingestTitlesDiagram, {
            en: "Poll production and pre-production; retry until new titles land in Workspace / RAW.",
            by: "Апытанне production і pre-production; паўтор, пакуль новыя тытулы не трапяць у Workspace / RAW.",
          }),
        ],
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
        diagrams: [
          enChart(collectReferencesDiagram, {
            en: "Poster fallback: IMDB, official site, then Google Images.",
            by: "Фолбэк постара: IMDB, афіцыйны сайт, потым Google Images.",
          }),
        ],
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
        diagrams: [
          enChart(generateAssetsDiagram, {
            en: "Parallel GPT generation of background, character, and unique title.",
            by: "Паралельная GPT-генерацыя фону, персанажа і ўнікальнага тытра.",
          }),
        ],
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
        diagrams: [
          enChart(commonTitleDiagram, {
            en: "Read the title from the reference; split when it runs past three strings.",
            by: "Зчытаць тытр з рэферэнса; разбіць, калі больш за тры радкі.",
          }),
        ],
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
        diagrams: [
          enChart(prepareBackgroundTitleDiagram, {
            en: "Resize background and title into Workspace / Raw.",
            by: "Рэсайз фону і тытра ў Workspace / Raw.",
          }),
          enChart(prepareCharacterDiagram, {
            en: "Crop the character to face and body bounds.",
            by: "Кроп персанажа па межах твару і цела.",
          }),
        ],
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
        diagrams: [
          enChart(composeConfigDiagram, {
            en: "Each render walks aspect ratio, format, size, and skin.",
            by: "Кожны рэндэр праходзіць прапорцыю, фармат, памер і скін.",
          }),
          enChart(composeRenderDiagram, {
            en: "Canvas compose with underlay, title, and branding branches. Character stays centered and is never resized.",
            by: "Кампазіцыя на палатне з галінамі падкладкі, тытра і брэндынгу. Персанаж застаецца па цэнтры і без рэсайзу.",
          }),
        ],
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
        diagrams: [
          enChart(qaCompareDiagram, {
            en: "Rendered poster vs reference via Gemma4.",
            by: "Рэндэр супраць рэферэнса праз Gemma4.",
          }),
          enChart(qaTransparencyDiagram, {
            en: "Transparent-pixel count on the common title.",
            by: "Падлік празрыстых пікселяў на агульным тытры.",
          }),
        ],
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
    solution: {
      en: "RAW layers keyed by movie ID. Renders named by skin, ratio, and size. References and QA scores live in the Obsidian vault.",
      by: "Слаі RAW па movie ID. Рэндэры з імем скін, прапорцыя і памер. Рэферэнсы і QA-балы — у сховішчы Obsidian.",
    },
    solutionDiagrams: [
      enChart(workspaceRawDiagram, {
        en: "Raw layers keyed by movie ID.",
        by: "Слаі RAW па movie ID.",
      }),
      enChart(workspaceVaultDiagram, {
        en: "Obsidian vault: renders named by skin, ratio, and size; references by movie ID.",
        by: "Сховішча Obsidian: рэндэры з імем скін, прапорцыя і памер; рэферэнсы па movie ID.",
      }),
      enChart(workspaceDatabaseDiagram, {
        en: "Vault database fields for titles, posters, and QA scores.",
        by: "Палі базы ў сховішчы: тытры, постары і QA-балы.",
      }),
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
      en: "PSD-to-Lua pipeline for hidden-object iOS ports. Layer names carried function; the engine read position and bounds. Cycle dropped from six months to three or four.",
      by: "Пайплайн PSD → Lua для hidden-object портаў на iOS. Імя слоя несла функцыю; рухавік чытаў пазіцыю і межы. Цыкл скараціўся з шасці месяцаў да трох–чатырох.",
    },
    stack: ["C++", "Lua", "Photoshop"],
    context: {
      en: "Early 2010s, mobile games were a growing market. The fast way for a studio to lead was to port PC titles to iOS: art already existed, but mechanics had to be rewritten from cursor click to finger touch. This was before Unity and Unreal were the default. The studio shipped on an in-house engine. A publisher supplied original art as PSD files — casual games, mostly hidden object, with mini-games and cutscenes. Those files held hundreds of layers with chaotic names.",
      by: "Пачатак 2010-х, рынак мабільных гульняў рос. Хуткі шлях для студыі — партаваць PC-тытулы на iOS: арт ужо быў, але механіку трэба было перапісаць з кліку мышшу на дотык пальцам. Гэта было да таго, як Unity і Unreal сталі стандартам. Студыя выпускала гульні на ўласным рухавіку. Выдавец даваў арыгінальны арт як PSD — казуальныя гульні, пераважна hidden object, з міні-гульнямі і катсцэнамі. У тых файлах — сотні слаёў з хаатычнымі імёнамі.",
    },
    problem: {
      en: "The first port took six months. Every item was exported by hand, placed in a text editor, and wired into a state machine. PSD is an old format, not meant to be parsed from outside. University C++ was the only coding background; this was the first production tooling.",
      by: "Першы парт заняў шэсць месяцаў. Кожны аб'ект экспартаваўся ўручную, ставіўся ў тэкставым рэдактары і падключаўся да стейт-машыны. PSD — стары фармат, не прызначаны для вонкавага парсінгу. З універсітэта быў толькі C++; гэта быў першы інструмент у прадакшне.",
    },
    effort: {
      duration: {
        en: "First title 6 months; later 3–4",
        by: "Першы тытул 6 месяцаў; пазней 3–4",
      },
      role: { en: "Game Designer & QA", by: "Game Designer & QA" },
      team: { en: "Solo on the pipeline", by: "Аднаасобна на пайплайне" },
      constraints: {
        en: [
          "In-house engine, custom Lua for levels and logic",
          "Publisher PSDs: hundreds of layers, no naming convention",
          "PSD not designed for external parsing",
          "Touch mechanics rewritten from PC",
        ],
        by: [
          "Уласны рухавік, кастомны Lua для ўзроўняў і логікі",
          "PSD ад выдаўца: сотні слаёў, без канвенцыі імён",
          "PSD не прызначаны для вонкавага парсінгу",
          "Механіка дотыку перапісаная з PC",
        ],
      },
      hard: {
        en: [
          "First production code",
          "Interpreting chaotic art files as level data",
          "A naming system that encoded object and function",
          "Fitting parse output to the Lua format the engine already used",
        ],
        by: [
          "Першы прадакшн-код",
          "Хаатычны арт як даныя ўзроўню",
          "Сістэма імён, дзе імя несла аб'ект і функцыю",
          "Укласці вынік парсінгу ў той Lua, на якім ужо жыў рухавік",
        ],
      },
    },
    diagrams: [
      {
        source: {
          en: `flowchart TD
  cleanup["Clean up PSD"]
  read["Read PSD"]
  logic["Export level logic"]
  assets["Export assets"]
  sheet["Build spritesheet"]
  test["Test"]
  cleanup --> read --> logic --> assets --> sheet --> test`,
          by: `flowchart TD
  cleanup["Пачысціць PSD"]
  read["Прачытаць PSD"]
  logic["Экспартаваць<br/>логіку ўзроўню"]
  assets["Экспартаваць ассеты"]
  sheet["Сабраць спрайтшыт"]
  test["Пратэставаць"]
  cleanup --> read --> logic --> assets --> sheet --> test`,
        },
        title: {
          en: "From cleaned PSD to a testable level.",
          by: "Ад пачышчанага PSD да ўзроўню на тэст.",
        },
      },
    ],
    process: {
      en: [
        "Clean up PSD — drop or merge non-interactive layers; rename to the system",
        "Read PSD",
        "Export level logic",
        "Export assets",
        "Build a spritesheet",
        "Test",
      ],
      by: [
        "Пачысціць PSD — прыбраць або зліць неінтэрактыўныя слаі; перайменаваць пад сістэму",
        "Прачытаць PSD",
        "Экспартаваць логіку ўзроўню",
        "Экспартаваць ассеты",
        "Сабраць спрайтшыт",
        "Пратэставаць",
      ],
    },
    sections: [
      {
        title: {
          en: "A naming system",
          by: "Сістэма імён",
        },
        body: {
          en: "Layer name = object + function. Designers spent time on cleanup instead of hand-placing every item.",
          by: "Імя слоя = аб'ект + функцыя. Дызайнеры трацілі час на чыстку, а не на ручное размяшчэнне кожнага аб'екта.",
        },
      },
      {
        title: {
          en: "Enough to parse",
          by: "Хопіць для парсінгу",
        },
        body: {
          en: "A GitHub library could read layer name, xy, and bounding box. That mapped into the studio's Lua level format.",
          by: "Бібліятэка з GitHub чытала імя слоя, xy і bounding box. Гэта клалася ў Lua-фармат узроўняў студыі.",
        },
      },
    ],
    solution: {
      en: "The parser wrote Lua level logic, exported assets, and built a spritesheet.",
      by: "Парсер пісаў Lua-логіку ўзроўню, экспартаваў ассеты і збіраў спрайтшыт.",
    },
    impact: {
      en: [
        "Later titles: 6 months → 3–4",
        "Saved time went to QA",
        "Studio hired and signed more publisher contracts",
      ],
      by: [
        "Наступныя тытулы: 6 месяцаў → 3–4",
        "Зэканомлены час пайшоў на QA",
        "Студыя наняла людзей і падпісала больш кантрактаў з выдаўцом",
      ],
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
      study.solutionDiagrams?.length ||
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
