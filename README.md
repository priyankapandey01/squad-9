# Lynx Run Club — Next.js site

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What's here

- Next.js 14 (App Router) + TypeScript + Tailwind
- `framer-motion` for the hero entrance and the event-photo crossfade
- Light theme (paper background, lime/magenta accents)

## Run assistant

The floating run assistant answers common Squad9 and running questions without
configuration. To enable generated conversational replies, set `OPENAI_API_KEY`
in `.env.local`. Optionally set `OPENAI_MODEL` to use another chat-completions
compatible model; the default is `gpt-4o-mini`.

## To make it yours

- **Photos**: `components/EventGallery.tsx` uses placeholder photos from
  picsum.photos. Drop real event photos into `public/events/` and swap
  each `src` for `/events/your-photo.jpg`.
- **Signup form**: `components/Signup.tsx` has a placeholder Google Form
  embed. Create your form, then Send → embed `<>` → copy the `src` URL
  in, replacing the placeholder.
- **Events**: edit the `events` array in `components/Events.tsx`.
- **Colors**: edit `tailwind.config.ts` (`paper`, `ink`, `lime`, `magenta`).

## Deploy

Push to GitHub and import into Vercel, or run `npm run build && npm start`.