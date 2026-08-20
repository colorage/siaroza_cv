# Siaroža CV

Personal CV / portfolio site for Siarhiej Piechcieraǔ (Siaroža) — Design Engineer.

**Live:** [siaroza.com](https://siaroza.com)  
**Preview:** [preview.siaroza.com](https://preview.siaroza.com)

| Branch | Deploy |
| --- | --- |
| `main` | Production — [siaroza.com](https://siaroza.com) |
| `preview` | Preview — [preview.siaroza.com](https://preview.siaroza.com) |

Push or merge to `preview` to update the preview site. Merge to `main` to update production.

Pet projects are currently published on `preview` only — they stay hidden on production.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Vercel

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`. Belarusian: `/by`.

## Content

- Experience: `content/experience.ts`
- Case studies: `content/case-studies.ts` (linked from the experience timeline)
- Pet projects: `content/projects.ts`
- UI strings: `messages/en.json`, `messages/by.json`
- CV PDF: `public/cv/siaroza-cv.pdf`
