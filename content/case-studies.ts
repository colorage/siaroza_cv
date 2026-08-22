import type { Locale } from "@/lib/i18n";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type CaseStudy = {
  slug: string;
  experienceId: string;
  title: LocalizedString;
  summary: LocalizedString;
  stack?: string[];
  context?: LocalizedString;
  problem?: LocalizedString;
  process?: LocalizedList;
  solution?: LocalizedString;
  solutionItems?: LocalizedList;
  impact?: LocalizedList;
  relatedSlugs?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "game-thumbnails",
    experienceId: "spribe",
    title: {
      en: "Game Thumbnails generation",
      by: "Генерацыя прэв'ю гульняў",
    },
    summary: {
      en: "Automated generation of game thumbnails with Python and AI image-editing workflows — scaling asset production for the product platform.",
      by: "Аўтаматычная генерацыя прэв'ю гульняў з дапамогай Python і AI-рэдагавання выяў — маштабаванне вытворчасці асетаў для прадуктовай платформы.",
    },
  },
  {
    slug: "icons-pack",
    experienceId: "spribe",
    title: {
      en: "Icons pack",
      by: "Пакет іконак",
    },
    summary: {
      en: "Icon system for the product platform, designed as a cohesive pack for product UI and related surfaces.",
      by: "Сістэма іконак для прадуктовай платформы — цэльны пакет для UI прадукту і сумежных паверхняў.",
    },
  },
  {
    slug: "chameleon-illustrations",
    experienceId: "spribe",
    title: {
      en: "Chameleon Illustrations",
      by: "Ілюстрацыі Chameleon",
    },
    summary: {
      en: "Illustration set for the Chameleon product line, aligned with platform visual language and brand.",
      by: "Набор ілюстрацый для лінейкі Chameleon, узгоднены з візуальнай мовай платформы і брэндам.",
    },
  },
  {
    slug: "site-customization-dashboard",
    experienceId: "spribe",
    title: {
      en: "Site customization dashboard",
      by: "Дашборд кастамізацыі сайта",
    },
    summary: {
      en: "Dashboard for customizing the product website, keeping brand and platform UI consistent while giving operators control over site presentation.",
      by: "Дашборд кастамізацыі прадуктовага сайта — кансістэнтнасць брэнда і UI платформы пры кіраванні выглядам сайта.",
    },
  },
  {
    slug: "local-llm-qa-agents",
    experienceId: "spribe",
    title: {
      en: "Local LLM QA",
      by: "Лакальны LLM QA",
    },
    summary: {
      en: "On-device vision QA that scores generated game thumbnails against official art, then sends low scores back into generation with catalog references instead of Google Images.",
      by: "Візуальны QA на прыладзе: лакальная мадэль ацэньвае згенераваныя прэв'ю гульняў у параўнанні з афіцыйным артам, а нізкія балы вяртаюць генерацыю да каталожных рэферэнсаў замест Google Images.",
    },
    stack: ["Python", "Ollama", "Gemma 4", "vision"],
    context: {
      en: "SPRIBE’s product platform needs game thumbnails at catalog scale. Generation was already automated, but the model was drawing from Google Images, and there was no systematic way to catch bad outputs before they shipped.",
      by: "Прадуктовая платформа SPRIBE патрабуе прэв'ю гульняў у маштабе каталога. Генерацыя ўжо была аўтаматызаваная, але мадэль абапіралася на Google Images — і не было сістэмнага спосабу злавіць дрэнныя вынікі да публікацыі.",
    },
    problem: {
      en: "Generated thumbnails carried visual artefacts. Google Images was the wrong source of truth: unofficial art, lookalike titles, wrong characters. Manual review could not keep up. Cloud vision APIs were off the table — original game art should not leave the machine.",
      by: "У згенераваных прэв'ю былі візуальныя артэфакты. Google Images быў няправільнай крыніцай праўды: неафіцыйны арт, падобныя назвы, чужыя персанажы. Ручны прагляд не паспяваў за аб'ёмам. Вонкавыя vision API былі выключаныя — арыгінальны арт гульняў не павінен пакідаць машыну.",
    },
    process: {
      en: [
        "Treat quality as a pipeline bug, not a prompt tweak. The reference set was the failure.",
        "Parse official provider catalogs for canonical game art.",
        "Pair each generated thumbnail with its original in a local game-notes vault (original PNG vs generated WebP).",
        "Run Gemma 4 31B locally via Ollama as a strict visual reviewer.",
        "Score character and object identity, then background and setting, from 0 to 100. Ignore title typography so restyled text does not inflate the score.",
        "Calibrate against score inflation — quantized local models defaulted to 100 without an explicit “use the full range” rubric.",
        "Write the integer into each game note. Skip already-scored or QA-pass items.",
        "Low scores trigger regeneration, now using catalog art as the reference.",
      ],
      by: [
        "Разглядаць якасць як памылку пайплайна, а не промпта. Зламаўся набор рэферэнсаў.",
        "Разабраць афіцыйныя каталогі правайдараў дзеля кананічнага арта гульняў.",
        "Звязаць кожнае згенераванае прэв'ю з арыгіналам у лакальным сховішчы нататак (арыгінал PNG супраць згенераванага WebP).",
        "Запусціць Gemma 4 31B лакальна праз Ollama як строгага візуальнага рэцэнзента.",
        "Ацаніць ідэнтычнасць персанажаў і аб'ектаў, потым фон і асяроддзе, ад 0 да 100. Ігнараваць тыпаграфіку назвы, каб перастылізаваны тэкст не завышаў бал.",
        "Адкалібраваць інфляцыю балаў — квантаваныя лакальныя мадэлі па змаўчанні ставілі 100 без яўнай рубрыкі «выкарыстоўвай увесь дыяпазон».",
        "Запісаць цэлы лік у кожную нататку гульні. Прапускаць ужо ацэненыя або пазначаныя як QA Pass.",
        "Нізкія балы запускаюць паўторную генерацыю — цяпер з каталожным артам як рэферэнсам.",
      ],
    },
    solution: {
      en: "A closed loop: catalog parse → local vision score → regenerate.",
      by: "Замкнёны цыкл: парсінг каталога → лакальны vision-бал → паўторная генерацыя.",
    },
    solutionItems: {
      en: [
        "Catalog parser for official references",
        "Compare-with-original: Gemma 4 sees both images, returns one integer, stores it on the game note",
        "Regeneration from catalog references instead of Google Images",
      ],
      by: [
        "Парсер каталогаў для афіцыйных рэферэнсаў",
        "Параўнанне з арыгіналам: Gemma 4 бачыць абедзве выявы, вяртае адзін цэлы лік, запісвае яго ў нататку гульні",
        "Паўторная генерацыя з каталожных рэферэнсаў замест Google Images",
      ],
    },
    impact: {
      en: [
        "Quality became a number that can drive the next generation run",
        "Official catalog art replaced Google Images as the source of truth",
        "Review runs on-device — assets never go to a third-party API",
        "Visual judgment encoded as a repeatable system, not a Slack thread",
      ],
      by: [
        "Якасць стала лікам, які можа кіраваць наступным запускам генерацыі",
        "Афіцыйны каталожны арт замяніў Google Images як крыніцу праўды",
        "Праверка ідзе на прыладзе — ассеты не трапляюць у вонкавы API",
        "Візуальнае меркаванне закадавана як паўтаральная сістэма, а не як трэд у Slack",
      ],
    },
    relatedSlugs: ["game-thumbnails"],
  },
  {
    slug: "psd-parser",
    experienceId: "cybercradle",
    title: {
      en: "PSD parser",
      by: "PSD-парсер",
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
      study.process ||
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
