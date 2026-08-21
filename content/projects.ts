import type { Locale } from "@/lib/i18n";

export type ProjectStage = "release" | "mvp" | "poc" | "nda";
export type ProjectStatus = "finished" | "active" | "prototype";

export type ProjectGalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

export type Project = {
  slug: string;
  name: string;
  stage: ProjectStage;
  status: ProjectStatus;
  url?: string;
  description: Record<Locale, string>;
  gallery?: ProjectGalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "yadoma-bel",
    name: "ядома.бел",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "yavolonter",
    name: "яволонтер",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "bloodlabs",
    name: "Blood Labs",
    stage: "release",
    status: "active",
    url: "https://apps.apple.com/app/blood-labs/id6774652156",
    description: {
      en: "Private iOS app to import blood lab reports from photo or PDF, track markers on a timeline, and compare results over time.",
      by: "Прыватны iOS‑дадатак для імпарту аналізаў крыві з фота ці PDF, адсочвання паказчыкаў на шкале часу і параўнання вынікаў.",
    },
    gallery: [
      {
        src: "/projects/bloodlabs/import.jpg",
        width: 1242,
        height: 2688,
        alt: {
          en: "Blood Labs import screen — add lab results from a photo or PDF",
          by: "Экран імпарту Blood Labs — дадаць аналізы з фота ці PDF",
        },
      },
      {
        src: "/projects/bloodlabs/store.jpg",
        width: 1242,
        height: 2688,
        alt: {
          en: "Blood Labs analysis overview — store results securely on the device",
          by: "Агляд аналізу ў Blood Labs — вынікі захоўваюцца на прыладзе",
        },
      },
      {
        src: "/projects/bloodlabs/track.jpg",
        width: 1242,
        height: 2688,
        alt: {
          en: "Blood Labs marker timeline — track LDL cholesterol over time",
          by: "Шкала часу паказчыка ў Blood Labs — адсочванне LDL халестэрыну",
        },
      },
      {
        src: "/projects/bloodlabs/compare.jpg",
        width: 1242,
        height: 2688,
        alt: {
          en: "Blood Labs home — compare current and previous lab results",
          by: "Галоўны экран Blood Labs — параўнанне бягучых і папярэдніх аналізаў",
        },
      },
      {
        src: "/projects/bloodlabs/family.jpg",
        width: 1242,
        height: 2688,
        alt: {
          en: "Blood Labs settings — manage family profiles on one device",
          by: "Налады Blood Labs — кіраванне сямейнымі профілямі на адной прыладзе",
        },
      },
    ],
  },
  {
    slug: "pavetra",
    name: "pavetra",
    stage: "release",
    status: "finished",
    url: "https://github.com/colorage/pavetra",
    description: {
      en: "Citizen air-quality network for Mahilioŭ — DIY ESP/PMS sensors posting PM2.5/PM10 every 20 minutes to an open map (Social Weekend 13 finalist).",
      by: "Народны маніторынг паветра ў Магілёве — DIY ESP/PMS датчыкі з публікацыяй PM2.5/PM10 кожныя 20 хвілін на адкрытую карту (фіналіст Social Weekend 13).",
    },
  },
  {
    slug: "pah-bot",
    name: "пах бот",
    stage: "release",
    status: "finished",
    url: "https://t.me/pah_pavetra_bot",
    description: {
      en: "Telegram bot for reporting unusual smells across Belarus — crowd-sourced odor map paired with pavetra air-quality data.",
      by: "Telegram-бот для паведамленняў пра нязвыклыя пахі па Беларусі — народная мапа пахаў у звязцы з данымі pavetra.",
    },
  },
  {
    slug: "dc",
    name: "dc",
    stage: "nda",
    status: "active",
    description: {
      en: "Details under NDA.",
      by: "Дэталі пад NDA.",
    },
  },
  {
    slug: "kropki-mahiliou",
    name: "кропкі / mahiliou",
    stage: "release",
    status: "active",
    url: "https://mahiliou.space/",
    description: {
      en: "Interactive map of historical buildings in Mahilioǔ — 180 landmarks with status filters, photos, and stories.",
      by: "Інтэрактыўная карта гістарычных будынкаў Магілёва — 180 аб'ектаў з фільтрамі статусу, фота і гісторыямі.",
    },
  },
  {
    slug: "radar-rockets",
    name: "Radar N Rockets",
    stage: "release",
    status: "finished",
    url: "https://kotka.itch.io/radar-n-rockets",
    description: {
      en: "Playdate action game — crank to scan the radar, then switch to a rocket gun and defend your base from kamikaze enemies.",
      by: "Экшан-гульня для Playdate — круціце рычажок, каб сканаваць радар, потым пераключайцеся на ракетную гармату і абараняйце базу ад камікадзэ.",
    },
  },
  {
    slug: "hejka-app",
    name: "hejka.app",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "halasy",
    name: "halasy",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "impact",
    name: "impact",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "polny-trash",
    name: "полны трэш",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "cobike",
    name: "cobike",
    stage: "poc",
    status: "prototype",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "losque",
    name: "LOSQUE",
    stage: "release",
    status: "finished",
    url: "https://www.youtube.com/channel/UCF5GXo8KGXLoTWDSRH1uy6w",
    description: {
      en: "Podcast about Mahilioǔ urban development — city news and conversations with love.",
      by: "Подкаст пра развіццё Магілёва — гарадскія навіны і размовы з любоўю.",
    },
  },
  {
    slug: "my-ostalis",
    name: "мы остались",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "kulturny-mogilev",
    name: "культурный могилев",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "akanicy",
    name: "akanicy",
    stage: "poc",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "sunsethunters-club",
    name: "sunsethunters club",
    stage: "poc",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "lacinka",
    name: "lacinka",
    stage: "release",
    status: "active",
    url: "https://www.raycast.com/colorage/lacinka",
    description: {
      en: "Raycast extension that converts selected text from Belarusian Cyrillic into Latin (Łacinka).",
      by: "Пашырэнне для Raycast, якое канвертуе вылучаны тэкст з беларускай кірыліцы ў лацінку.",
    },
  },
  {
    slug: "pavuk-club",
    name: "pavuk.club",
    stage: "release",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "inx",
    name: "inx",
    stage: "poc",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "photoplay",
    name: "photoplay",
    stage: "poc",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
