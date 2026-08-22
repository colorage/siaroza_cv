import type { Locale } from "@/lib/i18n";

export type CaseStudy = {
  slug: string;
  company: string;
  experienceId: string;
  start: string;
  end: string;
  tools: string[];
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  context: Record<Locale, string>;
  approach: Record<Locale, string[]>;
  outcome: Record<Locale, string>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "game-thumbnails",
    company: "SPRIBE",
    experienceId: "spribe",
    start: "2024",
    end: "Now",
    tools: ["Python", "Generative AI", "Photoshop", "Figma"],
    title: {
      en: "Game Thumbnails Design Cycle using AI",
      by: "Дызайн-цыкл гульнявых тамбнейлаў з AI",
    },
    summary: {
      en: "A production cycle for game thumbnails that combines art direction, generative AI, and Python exports — so campaign packs scale without looking generated.",
      by: "Вытворчы цыкл гульнявых тамбнейлаў: арт-дырэкшн, генератыўны AI і Python-экспарт — каб кампаніі маштабаваліся і не выглядалі згенераванымі.",
    },
    context: {
      en: "The product platform needs game thumbnails in many crops, languages, and campaign cuts. One-off Photoshop work could not keep up. Raw AI output was faster — and just as often off-brand, unreadable at small sizes, or legally unusable.",
      by: "Прадуктовай платформе патрэбныя тамбнейлы гульняў у розных кропах, мовах і кампанійных нарэзках. Разовая зборка ў Photoshop не паспявала. Сыры AI-вывад быў хутчэйшы — і гэтак жа часта па-за брэндам, нечытэльны ў малым памеры або юрыдычна непрыдатны.",
    },
    approach: {
      en: [
        "Wrote composition, crop, and type rules so a thumbnail still reads in a dense lobby grid.",
        "Constrained generation with those rules — lighting, character placement, palette — instead of open-ended prompting.",
        "Automated resize, localization overlays, and export packs in Python.",
        "Kept a human review gate for brand, legal, and readability before anything shipped.",
      ],
      by: [
        "Правілы кампазіцыі, кропу і тыпаграфікі, каб тамбнейл чытаўся ў шчыльнай сетцы лобі.",
        "Генерацыя пад гэтыя правілы — святло, пазіцыя персанажа, палітра — а не адкрыты промпт.",
        "Аўтаматызацыя рэсайзу, лакалізацыйных наложанняў і экспарт-пакаў на Python.",
        "Чалавечы рэўю як апошняя брама: брэнд, юрыдычнае, чытальнасць.",
      ],
    },
    outcome: {
      en: "Campaign packs moved through a repeatable cycle instead of a pile of one-offs. Designers spend time on direction and exceptions. Operators get consistent tiles. Selected frames stay internal.",
      by: "Кампанійныя пакі пайшлі паўтаральным цыклам замест кучы разавых файлаў. Дызайнеры працуюць з дырэкшнам і выключэннямі. Аператары атрымліваюць кансістэнтныя пліткі. Выбраныя кадры застаюцца ўнутранымі.",
    },
  },
  {
    slug: "chameleon-illustrations",
    company: "SPRIBE",
    experienceId: "spribe",
    start: "2024",
    end: "Now",
    tools: ["Figma", "Illustrator", "Custom plugins"],
    title: {
      en: "Chameleon Illustrations System",
      by: "Сістэма ілюстрацый Chameleon",
    },
    summary: {
      en: "An illustration system that keeps one drawing language across games and campaigns, then recolors and restyles without redrawing.",
      by: "Сістэма ілюстрацый з адной мовай малюнка для гульняў і кампаній — перафарбоўваецца і мяняе стыль без перамалёўкі.",
    },
    context: {
      en: "The platform needed illustrations for UI, empty states, marketing, and in-game moments. Each game has its own palette and mood. One-off drawings drifted. Full redraws for every theme were too slow to ship with the product.",
      by: "Платформе патрэбныя ілюстрацыі для UI, пустых станаў, маркетынгу і ўнутрыгульнявых момантаў. У кожнай гульні свая палітра і настрой. Разовыя малюнкі раз'язджаліся. Поўная перамалёўка пад кожную тэму не паспявала за прадуктам.",
    },
    approach: {
      en: [
        "Built a construction kit: grid, line weight, perspective, and character proportions.",
        "Separated structure from color — drawings as layered, token-mapped files.",
        "Named it Chameleon: swap palette, time of day, or game skin without rebuilding the drawing.",
        "Added Figma plugins to apply tokens and export consistent sets.",
      ],
      by: [
        "Канструктар: сетка, таўшчыня лініі, перспектыва, прапорцыі персанажаў.",
        "Структура асобна ад колеру — малюнкі як слаёвыя файлы з токенамі.",
        "Назва Chameleon: змяніць палітру, час сутак або скін гульні без перабудовы малюнка.",
        "Figma-плагіны для накладання токенаў і экспарту кансістэнтных сетаў.",
      ],
    },
    outcome: {
      en: "One illustration language that can change costume. New games and campaigns reuse the same drawings instead of starting from a blank page. Visual drift across the platform dropped because the system holds the line.",
      by: "Адна мова ілюстрацый, якая мяняе касцюм. Новыя гульні і кампаніі бяруць тыя самыя малюнкі замест чыстага аркуша. Візуальны дрэйф па платформе зменшыўся, бо сістэма трымае лінію.",
    },
  },
  {
    slug: "photoshop-level-design",
    company: "CyberCradle",
    experienceId: "cybercradle",
    start: "2011",
    end: "2014",
    tools: ["Photoshop", "ExtendScript", "Game engine"],
    title: {
      en: "Photoshop-based level design",
      by: "Левел-дызайн на базе Photoshop",
    },
    summary: {
      en: "Level design in Photoshop, piped into the game engine as structured data — so mobile ports did not mean rebuilding every stage by hand.",
      by: "Левел-дызайн у Photoshop з пайплайнам у рухавік як структураваныя даныя — каб мабільныя парты не азначалі ручную перабудову кожнай сцэны.",
    },
    context: {
      en: "Desktop games were being adapted for mobile. Designers already thought in Photoshop. Recreating levels in the engine from screenshots was slow, lossy, and disconnected from the art source. Manual placement also made QA harder: the level on disk was not the level on the canvas.",
      by: "Дэсктопныя гульні адаптавалі пад мабільныя платформы. Дызайнеры ўжо думалі ў Photoshop. Перастварэнне ўзроўняў у рухавіку па скрыншотах было павольным, з стратамі і адарваным ад арта. Ручная растаноўка ўскладняла QA: узровень на дыску не супадаў з узроўнем на палатне.",
    },
    approach: {
      en: [
        "Treated the PSD as the level: named groups as objects, layers as tiles and entities, layer comps as variants.",
        "Wrote scripts that exported positions, types, and assets into engine-readable data.",
        "Automated slicing and optimization of graphic assets for mobile.",
        "QA'd imported levels against original game logic and player flow.",
      ],
      by: [
        "PSD як узровень: названыя групы — аб'екты, слаі — тайлы і сутнасці, layer comps — варыянты.",
        "Скрыпты, якія экспартуюць пазіцыі, тыпы і ассеты ў фармат рухавіка.",
        "Аўтаматычная нарэзка і аптымізацыя графікі пад мабільныя платформы.",
        "QA імпартаваных узроўняў супраць арыгінальнай логікі і player flow.",
      ],
    },
    outcome: {
      en: "Designers iterated in a familiar tool. Engineering received structured data instead of screenshots. Mobile ports shipped faster and stayed closer to the desktop originals.",
      by: "Дызайнеры ітэравалі ў звыклым інструменце. Інжынеры атрымлівалі структураваныя даныя замест скрыншотаў. Мабільныя парты выходзілі хутчэй і бліжэй да дэсктопных арыгіналаў.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudiesForExperience(experienceId: string): CaseStudy[] {
  return caseStudies.filter((study) => study.experienceId === experienceId);
}
