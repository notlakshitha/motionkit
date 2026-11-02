# MotionKit

**Free, open-source cinematic landing page sections. Code + AI prompts. Copy, paste, ship.**

MotionKit is an MIT-licensed gallery of original heroes, backgrounds, sections, and full pages. It is a free alternative to paid motion-section libraries. Nothing here is copied from them: every scene, name, and prompt is written for this project.

Each block gives you three things:

- The React and Tailwind source
- A `prompt.md` you can paste into an AI coding assistant
- A shadcn registry install command

[Live demo](https://motionkit.vercel.app)

## Features

- Dark, cinematic gallery with live previews
- Filters for Heroes, Backgrounds, Sections, and Full pages
- Copy buttons for source, prompts, and install commands
- shadcn registry at `/r/<block>.json`
- `prefers-reduced-motion` on every effect
- Heavy WebGL stays off the gallery and loads only when a full block needs it
- A still fallback under every canvas and shader
- Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui, and Motion
- GSAP ScrollTrigger, React Three Fiber, and OGL where a block actually needs them
- Deploys on Vercel with no extra configuration

## Install

Clone the gallery:

```bash
git clone https://github.com/notlakshitha/motionkit.git
cd motionkit
npm install
npm run dev
```

Add one block to your own Next.js app:

```bash
npx shadcn add https://<domain>/r/particle-field-hero.json
```

Replace `<domain>` with the host that serves this site. On a deployment, the block page already fills that in.

Rebuild the registry after you change a block:

```bash
npm run registry:build
```

`npm run build` runs that step first.

## Blocks

| Block | Category | Install slug |
| --- | --- | --- |
| Particle Field | Heroes | `particle-field-hero` |
| Glass Refraction | Heroes | `glass-refraction-hero` |
| Orbit Objects | Heroes | `orbit-objects-hero` |
| Horizon Veil | Backgrounds | `horizon-veil` |
| Ember Mesh | Backgrounds | `ember-mesh` |
| Scroll Text Reveal | Sections | `scroll-text-reveal` |
| Bento Signal | Sections | `bento-signal` |
| Spotlight Follow | Sections | `spotlight-follow` |
| Logo Marquee | Sections | `logo-marquee` |
| Pricing Rise | Sections | `pricing-rise` |
| Beam CTA | Sections | `beam-cta` |
| Launch Reel | Full pages | `launch-reel` |

## Star

If MotionKit saves you a night of motion work, star the repository: [github.com/notlakshitha/motionkit](https://github.com/notlakshitha/motionkit).

## Docs

The in-site guide covers getting started, installing a block, and adding a new one: `/docs`. Contribution rules live in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Lakshitha Deshan (ReadY)
