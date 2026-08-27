---
type: case-study
slug: streaming-thumbnails
order: 0
experienceId: spribe
needs_translation: false
stack:
  - Python
  - Pillow
  - n8n
  - GPT Images
  - Obsidian
  - Ollama
locale: by
title: Дызайн-цыкл адаптыўных тамбнейлаў у стылі Netflix
cover: streaming-thumbnails/different-aspect-ratio.png
summary: >-
  Сістэма тамбнейлаў для B2B-агрэгатара фільмаў — адна геаметрыя, некалькі скінаў і прапорцый, чатыры памеры файла.
  Амаль 30 000 постераў за год.
---

## Кантекст

Платформа была B2B-агрэгатарам стрымінгу. Кожны тытул патрабаваў постараў пад любы макет: адна геаметрыя, каб сетка трымалася, некалькі скінаў, некалькі прапорцый, і png, webp або progressive jpeg у big, medium, small і tiny — каб кожная паверхня магла мяняць якасць на хуткасць.

Каталог не стаяў. Падключаліся новыя правайдары; ужо падключаныя дадавалі прэм'еры. Ручны збор не паспяваў. Пайплайн мусіў глядзець спачатку прадакшн, потым pre-release сырую базу: ранняя праца з сырымі данымі — тое, што не дае тытулу выйсці без постара.
## Намаганні

**Працягласць.** 1 год

**Роля.** Design Engineer

**Каманда.** Аднаасобна

### Абмежаванні

- Каталог рос ад новых правайдараў і прэм'ер
- Арыгіналы ад правайдара прыходзілі павольна і ў розных фарматах
- Публічныя каталогі стаялі за Cloudflare
- Раннія мадэлі збіваліся са стылю і не мелі роднай празрыстасці

### Што было складана

- Адны правілы кропу і геаметрыі на дзясяткі тысяч тытулаў
- Назвы ў адзін, два або тры радкі негатыўнай прасторы
- Твары на адной гарызанталі, сілуэты па цэнтры
- Тытр чытэльны на светлым арце

*Ад змены каталога да дастаўкі.*

```mermaid
flowchart TD
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
  upload --> notifyTeam
```

## Працэс

### Падцягнуць каталог

n8n спрацоўвае на змену ў базе і запускае дызайн-ланцуг. Прадакшн — прыярытэт; сырая база правайдара — другая. Трымаць гэтую сырую базу актуальнай — тое, што не дае тытулу выйсці без постара.

*Апытанне production і pre-production; паўтор, пакуль новыя тытулы не трапяць у Workspace / RAW.*

```mermaid
flowchart TD
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
```

### Зібраць рэферэнсы

Параўнанне каталога з лакальным сховішчам — і з'яўляецца to-do: тытулы без постара. Файлы правайдара дрэнна аўтаматызуюцца: павольна, кожны раз іншы фармат. Спачатку публічныя кадры: IMDb і Rotten Tomatoes пакрываюць большасць каталога; рэгіянальныя і нішавыя фільмы — з афіцыйнага сайта або пошуку выяў. Playwright не праходзіў Cloudflare. Chrome CDP, з адным чалавечым праходам на сесію, праходзіў. Рэферэнсы жылі ў Obsidian.

*Фолбэк постара: IMDB, афіцыйны сайт, потым Google Images.*

```mermaid
flowchart TD
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
```

### Згенераваць слаі

Кансістэнтнасць — адна і тая ж дэканструкцыя кожнага постара: пярэдні план (чалавек, жывёла, аб'ект), фон, унікальны тытр. Кожны слой мае ўласны промпт да рэферэнса — фон без надпісу і буйнога аб'екта; пярэдні план не абрэзаны, на празрыстым; тытр 2:1, таксама празрысты. Спачатку быў Gemini (Nano Banana). Ён збіваўся са стылю, галюцынаваў і не меў альфы. Празрыстасць можна зрабіць скрыптам або Photoshop batch, але краі чысцейшыя, калі мадэль аддае яе сама. Перайшоў на GPT Images 2.0, калі з'явілася API.

*Паралельная GPT-генерацыя фону, персанажа і ўнікальнага тытра.*

```mermaid
flowchart TD
  refs["Workspace / References"]
  gpt["GPT images"]
  bg[Background]
  character[Character]
  uniqueTitle[Unique title]
  raw["Workspace / Raw"]

  refs --> gpt
  gpt --> bg --> raw
  gpt --> character --> raw
  gpt --> uniqueTitle --> raw
```

### Агульны тытр

Некаторым кліентам агрэгатара патрэбны быў адзін тытр на ўвесь каталог — больш кантрасту, герой трымае ўвагу. Складанае — запоўніць негатыўную прастору і падзяліць назву на адзін, два або тры радкі так, каб яна чыталася. Калі арыгінальны тытр чытэльны, OCR захоўвае гэты падзел. Калі не — Python-скрыпт.

*Зчытаць тытр з рэферэнса; разбіць, калі больш за тры радкі.*

```mermaid
flowchart TD
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
```

### Падладзіць слаі

Фон і тытр — лёгкая праца: кроп (мадэлі часам пакідаюць белую рамку), водступ для тытра, рэсайз. Пярэдні план патрабуе кропкі цікавасці. Дэтэкт твару і сілуэту. Усе твары на адной гарызанталі; сілуэты ў цэнтры кадра. Кроп ад гэтых кропак з мінімальнай стратай. Пераменная мінімальнага памеру твару кантралюе, наколькі буйны герой.

*Рэсайз фону і тытра ў Workspace / Raw.*

```mermaid
flowchart TD
  bg[Background]
  titleNode[Title]
  resizeBg[Resize]
  resizeTitle[Resize]
  raw["Workspace / Raw"]

  bg --> resizeBg --> raw
  titleNode --> resizeTitle --> raw
```

*Кроп персанажа па межах твару і цела.*

```mermaid
flowchart TD
  character[Character]
  face[Face bounds]
  body[Body bounds]
  crop[Crop]
  raw["Workspace / Raw"]

  character --> face --> crop
  character --> body --> crop
  crop --> raw
```

### Рэндэр

Складае кожную патрэбную прапорцыю, памер, фармат, скін і імя файла. Фон заўсёды запаўняе кадр. Герой у цэнтры, без рэсайзу. Унікальны або агульны тытр — унізе па цэнтры; памяншаецца, калі кадр вузейшы за 1:1. Некаторыя скіны маюць падкладку — каляровы або чорны градыент для кантрасту тытра. Адценне з фону: маштаб да 9×9 і колер цэнтральнага пікселя. На светлым арце белае ўсё роўна правальваецца, таму пайплайн выбірае з 16 адценняў поўнага кола з тым жа кантрастам белага на колеры. Астатняе — Pillow.

![Ключавы арт Wednesday у дзевяці прапорцыях, ад 1:2 да 2:1](streaming-thumbnails/different-aspect-ratio.png)

*Адна геаметрыя ў дзевяці прапорцыях. Персанаж застаецца па цэнтры; тытр унізе па цэнтры і памяншаецца на вузейшых кадрах.*

![Ключавы арт Stranger Things у памерах tiny, small, medium і large](streaming-thumbnails/different-size.png)

*Чатыры памеры файла — tiny, small, medium, large — каб кожная паверхня магла мяняць якасць на хуткасць.*

*Кожны рэндэр праходзіць прапорцыю, фармат, памер і скін.*

```mermaid
flowchart TD
  ratios[Aspect ratios]
  formats[Formats]
  sizes[Sizes]
  skins[Skins]
  ratios --> formats --> sizes --> skins
```

*Кампазіцыя на палатне з галінамі падкладкі, тытра і брэндынгу. Персанаж застаецца па цэнтры і без рэсайзу.*

```mermaid
flowchart TD
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
```

```widget
id: thumbnail-pipeline
```

### Лакальны AI QA

Дзве праверкі: колькі празрыстых пікселяў засталося ў тытры, і ці супадае рэндэр з рэферэнсам. Падлік пікселяў — проста. Параўнанне выяў не мусіць быць хуткім — Gemma 4 праз Ollama ішла ноччу, станцыя не прастойвала. У Obsidian — арыгінал і рэндэр плюс абодва балы. Сартаванне па бале само складае чаргу. Плагін запускае shell-скрыпт са сховішча, таму тая ж дошка — і панэль кіравання.

*Рэндэр супраць рэферэнса праз Gemma4.*

```mermaid
flowchart TD
  rendered[Rendered Poster]
  reference[Reference Poster]
  compare["Compare two images<br/>via Gemma4"]
  db[(Database)]

  rendered --> compare
  reference --> compare
  compare --> db
```

*Падлік празрыстых пікселяў на агульным тытры.*

```mermaid
flowchart TD
  titleNode[Common title]
  calc[Calculate transparent pixels]
  db[(Database)]

  titleNode --> calc --> db
```

### Дастаўка праз watchfolder

Апошні крок самы просты, і яго таксама можна аўтаматызаваць. Watchfolder на рабочай папцы загружае, апавяшчае, сінхранізуе і робіць бэкап.

## Рашэнне

Слаі RAW па movie ID. Рэндэры з імем скін, прапорцыя і памер. Рэферэнсы і QA-балы — у сховішчы Obsidian.

*Слаі RAW па movie ID.*

```mermaid
flowchart TD
  workspace[Workspace]
  rawFolder[Raw]
  movieId[Movie ID]
  bg[background.png]
  fg[foreground]
  unique[unique_title.png]
  common[common_title.png]
  workspace --> rawFolder --> movieId --> bg --> fg --> unique --> common
```

*Сховішча Obsidian: рэндэры з імем скін, прапорцыя і памер; рэферэнсы па movie ID.*

```mermaid
flowchart TD
  vault[Obsidian Vault]
  renderFile["skin_ratio_size.png"]
  refFile[movie_id.png]
  vault --> renderFile --> refFile
```

*Палі базы ў сховішчы: тытры, постары і QA-балы.*

```mermaid
flowchart TD
  name[Name]
  splitTitle[Split title]
  renderedPoster[Rendered poster]
  refField[Reference]
  qaTitle[QA title score]
  qaMatch[QA match score]
  name --> splitTitle --> renderedPoster --> refField --> qaTitle --> qaMatch
```

## Вынік

- Амаль 30 000 тамбнейлаў за год
- Зэканомленыя сотні тысяч еўра
- Змены каталога запускаюць увесь ланцуг без ручнога збору
