import type { Locale } from "@/lib/i18n";

export type ProjectStage = "release" | "mvp" | "poc" | "nda";
export type ProjectStatus = "finished" | "active" | "prototype";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  stage: ProjectStage;
  status: ProjectStatus;
  url?: string;
  links?: ProjectLink[];
  description: Record<Locale, string>;
};

export const projects: Project[] = [
  {
    slug: "yadoma-bel",
    name: "ядома.бел",
    stage: "release",
    status: "finished",
    description: {
      en: "COVID-19 #StayHome map (March 2020) — people staying home checked in via Telegram bot and appeared on a public map by city, without names or exact location.",
      by: "Мапа #StayHome часу COVID-19 (сакавік 2020) — хто сядзеў дома, адзначаўся праз Telegram-бота і з'яўляўся на публічнай карце па горадзе, без імені і дакладнай лакацыі.",
    },
  },
  {
    slug: "spasem-bel",
    name: "спасём.бел",
    stage: "release",
    status: "finished",
    links: [{ label: "telegram", href: "https://t.me/spasyom_bel_bot" }],
    description: {
      en: "COVID-19 volunteer map (2020) — people offered help via Telegram bot for delivery, food, housing, funding, or info; medics posted hospital needs in red on the public map.",
      by: "Мапа валанцёраў COVID-19 (2020) — праз Telegram-бота людзі прапаноўвалі дастаўку, ежу, жытло, фінансы ці інфармацыю; медыкі пазначалі патрэбы бальніц чырвоным на публічнай карце.",
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
  },
  {
    slug: "pavetra",
    name: "pavetra",
    stage: "release",
    status: "finished",
    url: "https://www.youtube.com/@pavetra3574",
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
    url: "https://hejka.app",
    description: {
      en: "Personal migration assistant to prepare and manage documents for life in a new city — local-first, private helpers, instructions, and checklists.",
      by: "Асабісты памочнік па міграцыі: падрыхтоўка і вядзенне дакументаў для жыцця ў новым горадзе — лакальныя прыватныя дапаможнікі, інструкцыі і чэклісты.",
    },
  },
  {
    slug: "halasy",
    name: "halasy",
    stage: "release",
    status: "finished",
    links: [
      { label: "telegram", href: "https://t.me/halasy_belarusi" },
      { label: "@halasy_bot", href: "https://t.me/halasy_bot" },
    ],
    description: {
      en: "Interactive map of Belarusian voices — anonymous, safe statements via Telegram bot, shown on a public map for people inside the country and abroad.",
      by: "Інтэрактыўная мапа думак беларусаў — ананімныя і бяспечныя выказванні праз Telegram-бота на публічнай карце, знутры краіны і з-за мяжы.",
    },
  },
  {
    slug: "impact",
    name: "impact",
    stage: "mvp",
    status: "finished",
    links: [
      {
        label: "Figma",
        href: "https://www.figma.com/design/l3VohC0ZSKnuI6paEifGvh/Impact",
      },
    ],
    description: {
      en: "Solana Hackathon project — a community blockchain-based game on Solana.",
      by: "Праект для Solana Hackathon — супольная блокчэйн-гульня на Solana.",
    },
  },
  {
    slug: "polny-trash",
    name: "полны трэш",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Smart-city hackathon project — QR stickers for city trash cans; scan the code to notify municipal services that a can is full.",
      by: "Праект смарт-сіці хакатону — QR-наклейкі на гарадскія сметніцы; адскануй код, каб паведаміць камунальнікам, што бак поўны.",
    },
  },
  {
    slug: "cobike",
    name: "cobike",
    stage: "poc",
    status: "prototype",
    description: {
      en: "GPS bike game — two random riders compete in real life to reach the same location first.",
      by: "GPS-гульня на роварах — два выпадковыя ўдзельнікі ўжывую спаборнічаюць, хто першы даедзе да адной лакацыі.",
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
    url: "https://www.youtube.com/channel/UCHgkQ6OZ5y-a-yzZt-oBCCQ",
    description: {
      en: "YouTube series on how to survive in Mahilioǔ — and make the city better.",
      by: "YouTube-серыя пра тое, як выжыць у Магілёве — і зрабіць горад лепшым.",
    },
  },
  {
    slug: "kulturny-mogilev",
    name: "культурный могилев",
    stage: "release",
    status: "finished",
    description: {
      en: "City guide for Mahilioǔ — where to go so you don’t regret the time: local events, venues, and culture.",
      by: "Гід па Магілёве — куды схадзіць і не пашкадаваць пра час: мясцовыя падзеі, месцы і культура.",
    },
  },
  {
    slug: "mogilev-norm",
    name: "могилев нормальный",
    stage: "release",
    status: "finished",
    links: [
      { label: "instagram", href: "https://www.instagram.com/mogilev_norm/" },
      { label: "telegram", href: "https://t.me/mogilev_norm" },
    ],
    description: {
      en: "City guide for Mahilioǔ — where to go so you don’t regret the time: local events, venues, and culture.",
      by: "Гід па Магілёве — куды схадзіць і не пашкадаваць пра час: мясцовыя падзеі, месцы і культура.",
    },
  },
  {
    slug: "akanicy",
    name: "akanicy",
    stage: "poc",
    status: "active",
    url: "https://trip.siaroza.com/",
    description: {
      en: "Personal scroll gallery of trip memories — each Akanica trip opens with a cover and date, then a photo grid.",
      by: "Асабістая галерэя ўспамінаў з паездак — кожная вандроўка Akanica адкрываецца вокладкай і датай, далей сетка фота.",
    },
  },
  {
    slug: "sunsethunters-club",
    name: "Sunset Hunters Club",
    stage: "poc",
    status: "active",
    url: "https://sunsethunters.club/",
    description: {
      en: "iOS app for one live sunset a day — camera unlocks only during the local golden hour, with streaks, a live terminator map, and community rays.",
      by: "iOS‑дадатак для аднаго жывога захаду сонца ў дзень — камера адкрываецца толькі ў мясцовы залаты час, са стрэкамі, жывой мапай тэрмінатара і прамянямі супольнасці.",
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
    url: "https://pavuk.club/",
    description: {
      en: "Browser-based straw mobile (himmeli) designer — build geometric straw structures, tie them with thread, and watch live physics hang and balance each piece.",
      by: "Браўзерны канструктар саломавых мабіляў (гімелі) — збірайце геаметрычныя канструкцыі з саломінак, звязвайце ніткай і глядзіце, як жывая фізіка падвешвае і балансуе кожную дэталь.",
    },
  },
  {
    slug: "inx",
    name: "inx",
    stage: "nda",
    status: "active",
    description: {
      en: "Details under NDA.",
      by: "Дэталі пад NDA.",
    },
  },
  {
    slug: "photoplay",
    name: "photoplay",
    stage: "poc",
    status: "active",
    description: {
      en: "Generate a music playlist from your photos.",
      by: "Генерацыя музычнага плэйліста па вашых фота.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
