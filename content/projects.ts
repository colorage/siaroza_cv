import type { Locale } from "@/lib/i18n";

export type ProjectStage = "release" | "mvp" | "poc" | "nda";
export type ProjectStatus = "finished" | "active" | "prototype";

export type Project = {
  slug: string;
  name: string;
  stage: ProjectStage;
  status: ProjectStatus;
  url?: string;
  description: Record<Locale, string>;
};

export const projects: Project[] = [
  {
    slug: "yadoma-bel",
    name: "ядома.бел",
    stage: "release",
    status: "finished",
    url: "https://web.archive.org/web/20200326071645/http://xn--80ahyh7f.xn--90ais/",
    description: {
      en: "Interactive #StayHome map of Belarus, launched in spring 2020 with Anton Turko — a nationwide show of support for people who chose self-isolation in the first COVID-19 wave.",
      by: "Інтэрактыўная карта #StayHome Беларусі, запушчаная вясной 2020 разам з Антонам Турко — усенародная падтрымка тых, хто абраў самаізаляцыю ў першую хвалю COVID-19.",
    },
  },
  {
    slug: "yavolonter",
    name: "яволонтер",
    stage: "release",
    status: "finished",
    description: {
      en: "Volunteer mutual-aid in Mahilioǔ after August 2020 — helping relatives of people held in the detention center with food, information, and support.",
      by: "Валанцёрская ўзаемадапамога ў Магілёве пасля жніўня 2020 — ежа, інфармацыя і падтрымка для родных людзей, якія трапілі ў ІЧУ.",
    },
  },
  {
    slug: "bloodlabs",
    name: "Blood Labs",
    stage: "release",
    status: "active",
    url: "https://apps.apple.com/app/blood-labs/id6774652156",
    description: {
      en: "Private iOS app to import blood lab reports from photo or PDF, track markers on a timeline, compare tests, and keep family profiles encrypted on-device.",
      by: "Прыватны iOS‑дадатак для імпарту аналізаў крыві з фота ці PDF, адсочвання паказчыкаў на шкале часу, параўнання тэстаў і сямейных профіляў — даныя шыфруюцца на прыладзе.",
    },
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
      en: "Interactive map of historical buildings in Mahilioǔ — 180 landmarks with status filters, photos, and stories. Started in 2021 with Aliaksei Baciukoŭ and Anton Turko; restored in 2026.",
      by: "Інтэрактыўная карта гістарычных будынкаў Магілёва — 180 аб'ектаў з фільтрамі статусу, фота і гісторыямі. Створана ў 2021 з Аляксеем Бацюковым і Антонам Турко, адноўлена ў 2026.",
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
    url: "https://hejka.app",
    description: {
      en: "Local-first app to prepare and manage documents for life in a new city — private by default.",
      by: "Лакальны дадатак для падрыхтоўкі і вядзення дакументаў для жыцця ў новым горадзе — прыватнасць па змаўчанні.",
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
    url: "https://trip.siaroza.com/",
    description: {
      en: "Single-page scroll photo galleries for trip memories — a series of Akanica trip pages.",
      by: "Аднастаронкавыя фотагалерэі падарожжаў са скролам — серыя старонак Akanica.",
    },
  },
  {
    slug: "sunsethunters-club",
    name: "sunsethunters club",
    stage: "poc",
    status: "active",
    url: "https://sunsethunters.club/",
    description: {
      en: "Live map of the sunset terminator and golden-hour window — a club PoC for catching the light.",
      by: "Жывая мапа лініі захаду сонца і акна залатой гадзіны — PoC-клуб для тых, хто ловіць святло.",
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
    url: "https://pavuk.club",
    description: {
      en: "Browser designer for traditional straw mobiles (pavuk / himmeli) with real physics in Three.js.",
      by: "Браўзерны канструктар традыцыйных саламяных павукоў (pavuk / himmeli) з рэальнай фізікай на Three.js.",
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
    url: "https://photoplay.app",
    description: {
      en: "Share iPhone Live Photos with anyone — a Mac sync app and web player that keeps the motion on Android, Windows, and the browser, private by default.",
      by: "Падзяліцца iPhone Live Photos з кім заўгодна — Mac-дадатак і вэб-плэер, які захоўвае рух на Android, Windows і ў браўзеры, прыватна па змаўчанні.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
