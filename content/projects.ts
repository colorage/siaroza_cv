import type { Locale } from "@/lib/i18n";

export type ProjectStage = "release" | "mvp" | "poc" | "nda";
export type ProjectStatus = "finished" | "active" | "prototype";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      alt: Record<Locale, string>;
      caption?: Record<Locale, string>;
      href?: string;
    }
  | {
      type: "youtube";
      id: string;
      title: Record<Locale, string>;
      caption?: Record<Locale, string>;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      title: Record<Locale, string>;
      caption?: Record<Locale, string>;
    }
  | { type: "pdf-pages"; dir: string; count: number };

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
  links?: ProjectLink[];
  media?: ProjectMedia[];
  role?: Record<Locale, string>;
  description: Record<Locale, string>;
  gallery?: ProjectGalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "yadoma-bel",
    name: "ядома.бел",
    stage: "release",
    status: "finished",
    url: "https://web.archive.org/web/20200326071645/http://xn--80ahyh7f.xn--90ais/",
    links: [
      {
        label: "Reform.news",
        href: "https://reform.news/belarusy-sozdali-onlajn-kartu-sidjashhih-doma-iz-za-koronavirusa",
      },
    ],
    description: {
      en: "COVID-19 #StayHome map (March 2020) — people staying home checked in via Telegram bot; avatars and short notes appeared on a public map, without names or exact location.",
      by: "Мапа #StayHome часу COVID-19 (сакавік 2020) — хто сядзеў дома, адзначаўся праз Telegram-бота; аватаркі і кароткія нататкі з'яўляліся на публічнай карце, без імён і дакладнай лакацыі.",
    },
    media: [
      {
        type: "image",
        src: "/projects/yadoma-bel/map.jpg",
        width: 1329,
        height: 793,
        alt: {
          en: "Dark map of Eastern Europe with person markers clustered over Belarus, densest in Minsk, and scattered across neighboring countries.",
          by: "Цёмная мапа Усходняй Еўропы з фігуркамі людзей, сабранымі па Беларусі — найгусцей у Мінску — і разыйшоўшыміся па суседніх краінах.",
        },
        caption: {
          en: "Country view in March 2020 — check-ins as person marks by city, no names or exact location.",
          by: "Краіна ў сакавіку 2020 — адзнакі людзей па горадзе, без імён і дакладнай лакацыі.",
        },
        href: "https://reform.news/belarusy-sozdali-onlajn-kartu-sidjashhih-doma-iz-za-koronavirusa",
      },
    ],
  },
  {
    slug: "spasem-bel",
    name: "спасём.бел",
    stage: "release",
    status: "finished",
    url: "https://web.archive.org/web/20201127023118/http://xn--80ayhhc0h.xn--90ais/",
    links: [
      { label: "telegram", href: "https://t.me/spasyom_bel_bot" },
      { label: "МотолькоПомоги", href: "https://t.me/motolkohelp/8320" },
    ],
    media: [
      {
        type: "image",
        src: "/projects/spasem-bel/coverage.jpg",
        width: 800,
        height: 418,
        href: "https://t.me/motolkohelp/8320",
        alt: {
          en: "спасём.бел brand still — red plus-bubble on isometric blocks",
          by: "Брэнд-візуал спасём.бел — чырвоны бабл з плюсам на ізаметрычных блоках",
        },
        caption: {
          en: "Still from the МотолькоПомоги announcement, 6 April 2020.",
          by: "Візуал з анонсу ў МотолькоПомоги, 6 красавіка 2020.",
        },
      },
    ],
    description: {
      en: "Map of medics and volunteers during COVID-19 (April 2020) — offer delivery, food, housing, funding, or info via Telegram bot; hospital requests appeared in red.",
      by: "Мапа медыкаў і валанцёраў часу COVID-19 (красавік 2020) — праз Telegram-бота людзі прапаноўвалі дастаўку, ежу, жытло, фінансы ці інфармацыю; запыты бальніц з'яўляліся чырвоным.",
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
      en: "Interactive map of historical buildings in Mahilioǔ — 180 landmarks with status filters, photos, and stories. Started in 2021 with Aliaksei Baciukoŭ and Anton Turko; restored in 2026.",
      by: "Інтэрактыўная карта гістарычных будынкаў Магілёва — 180 аб'ектаў з фільтрамі статусу, фота і гісторыямі. Створана ў 2021 з Аляксеем Бацюковым і Антонам Турко, адноўлена ў 2026.",
    },
    media: [
      {
        type: "image",
        src: "/projects/kropki-mahiliou/icons.png",
        width: 1600,
        height: 1200,
        alt: {
          en: "Grid of twenty grayscale geometric icons of Mahilioǔ buildings and landmarks.",
          by: "Сетка з дваццаці шэрых геаметрычных іконак будынкаў і славутасцяў Магілёва.",
        },
        caption: {
          en: "Map icons for kropki — twenty Mahilioǔ landmarks drawn as compact building marks.",
          by: "Іконкі для кропак — дваццаць гістарычных будынкаў Магілёва як кампактныя знакі на карце.",
        },
        href: "https://dribbble.com/shots/16269129-kropki-icons",
      },
    ],
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
    media: [
      {
        type: "video",
        src: "/projects/halasy/demo.mp4",
        poster: "/projects/halasy/demo-poster.jpg",
        title: {
          en: "halasy — demo",
          by: "halasy — дэма",
        },
        caption: {
          en: "Motion demo of the voices map — Belarus as a field of anonymous statements.",
          by: "Моўшн-дэма мапы галасоў — Беларусь як поле ананімных выказванняў.",
        },
      },
    ],
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
    media: [
      {
        type: "youtube",
        id: "9m_1mo-vgD8",
        title: {
          en: "Impact Game — Pitch",
          by: "Impact Game — пітч",
        },
        caption: {
          en: "Hackathon pitch — weekly Solana community game of capturing, upgrading, and burning grid cells.",
          by: "Пітч для хакатону — штотыднёвая Solana-гульня супольнасці: захоп, паляпшэнне і спальванне клетак сеткі.",
        },
      },
    ],
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
    slug: "tedxmahilyow",
    name: "TEDxMahilyow",
    stage: "release",
    status: "finished",
    role: {
      en: "Volunteer, designer, stage decorator",
      by: "Валанцёр, дызайнер, дэкаратар сцэн",
    },
    links: [
      { label: "TED", href: "https://www.ted.com/search?q=TEDxMahilyow" },
      {
        label: "Flickr",
        href: "https://www.flickr.com/photos/187970690@N08/albums/72157713847203666",
      },
    ],
    media: [
      {
        type: "image",
        src: "/projects/tedxmahilyow/oxana.png",
        width: 800,
        height: 600,
        alt: {
          en: "oXana — TEDxMahilyow logo, a red x wrapped in pale blue ribbons",
          by: "oXana — лагатып TEDxMahilyow, чырвоны x у блакітных стужках",
        },
        caption: {
          en: "Logo for TEDxMahilyow — a red x wrapped in pale blue ribbons, after Yoga Perdana.",
          by: "Лагатып TEDxMahilyow — чырвоны x у блакітных стужках, пасля работ Yoga Perdana.",
        },
        href: "https://dribbble.com/shots/2848906-oXana",
      },
      {
        type: "image",
        src: "/projects/tedxmahilyow/tedx-pattern.png",
        width: 800,
        height: 600,
        alt: {
          en: "TEDxMahilyow 2017 identity pattern — red hangers in a Belarusian ornament over “ideas worth spreading”",
          by: "Патэрн ідэнтычнасці TEDxMahilyow 2017 — чырвоныя вешалкі ў беларускім арнаменце і радок «ідэі, вартыя распаўсюду»",
        },
        caption: {
          en: "Identity pattern for TEDxMahilyow 2017 — hangers as a Belarusian ornament, with the line “ideas worth spreading.”",
          by: "Патэрн ідэнтычнасці TEDxMahilyow 2017 — вешалкі як беларускі арнамент і радок «ідэі, вартыя распаўсюду».",
        },
        href: "https://dribbble.com/shots/3561776-TEDx-pattern",
      },
    ],
    description: {
      en: "Independently organized TED conference in Mahilioǔ (2016–2019) — talks by local speakers, published on TED.com.",
      by: "Незалежная канферэнцыя TED у Магілёве (2016–2019) — выступы мясцовых спікераў, апублікаваныя на TED.com.",
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
    url: "https://photoplay.app",
    description: {
      en: "Generate a music playlist from your photos.",
      by: "Генерацыя музычнага плэйліста па вашых фота.",
    },
  },
  {
    slug: "belarus-bw",
    name: "Беларусь Чорна Белая",
    stage: "release",
    status: "active",
    url: "https://www.instagram.com/belarus_bw/",
    description: {
      en: "Stories of Belarusian resistance — heroes, well-known people, volunteers, and initiatives — against an information war that paints all of Belarus as the enemy.",
      by: "Гісторыі беларускага супраціву — героі, вядомыя людзі, валанцёры і ініцыятывы — супраць інфармацыйнай вайны, якая малюе ўсю Беларусь як ворага.",
    },
    media: [
      {
        type: "youtube",
        id: "2Prl_IhufQM",
        title: {
          en: "Belarus Black and White — Belarusian resistance in stories and numbers",
          by: "Беларусь Чорна Белая — Беларускі супраціў у гісторыях і лічбах",
        },
        caption: {
          en: "Short film on Belarusian resistance — people, actions, and the numbers behind them.",
          by: "Кароткі фільм пра беларускі супраціў — людзі, учынкі і лічбы за імі.",
        },
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjectSlugs = [
  "bloodlabs",
  "pavuk-club",
  "lacinka",
] as const;

export function getFeaturedProjects(): Project[] {
  return featuredProjectSlugs
    .map((slug) => getProject(slug))
    .filter(
      (project): project is Project =>
        project !== undefined && project.stage !== "nda",
    );
}

/** Active projects first; original order is kept within each status. */
export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return 0;
  });
}
