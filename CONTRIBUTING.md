# Contributing to MotionKit

Thanks for adding to the library. MotionKit stays useful if every block is original, readable, and kind to people who prefer less motion.

## Ground rules

- License new work under MIT, the same as the rest of the repository.
- Write original scenes. Do not copy sections, prompts, names, copy, or layouts from paid motion libraries or from other galleries.
- Fictional product names in sample copy must be invented for the block.
- Keep blocks self-contained under `registry/motionkit/` so a registry install does not need the marketing site.

## Motion, weight, and fallbacks

- Every animation checks `prefers-reduced-motion`. Use `usePrefersReducedMotion` from `registry/motionkit/use-reduced-motion.ts`.
- Reduced motion should show the finished composition, not a blank frame.
- Ship a static fallback that still looks designed if JavaScript, WebGL, or a library fails to load.
- Do not mount WebGL, Three.js, or OGL in gallery previews. Gate those imports on `preview === false` and on motion being allowed. Load them with a dynamic import so the homepage does not pay for them.
- Clean up animation frames, observers, and GSAP contexts on unmount.

## Add a block

1. Create the component in `registry/motionkit/<slug>.tsx`. Export a named function. Accept `{ preview?: boolean }`.
2. If the effect is heavy, put the engine in a sibling file and import it from the shell.
3. Write `content/prompts/<slug>.md`. Describe the layout, motion, fallback, reduced-motion behavior, and the sample copy. A person should be able to paste the prompt into an AI coding assistant and rebuild the scene.
4. Add an entry to `content/catalog.json` with `slug`, `title`, `category`, `description`, `dependencies`, and `files`. Categories are `Heroes`, `Backgrounds`, `Sections`, and `Full pages`. Include `use-reduced-motion.ts` in `files` when the component imports it.
5. Register the component in `components/site/block-view.tsx`.
6. Run `npm run registry:build`. Commit `registry.json`, `public/r/<slug>.json`, and `lib/generated/block-sources.ts`.
7. Run `npm run lint` and `npm run build`.

## Pull requests

- Explain which block you added or which behavior you fixed.
- Include a screenshot of the block page when the change is visual.
- Keep the diff focused. Do not restyle unrelated blocks.

Questions and proposals belong in GitHub issues on [notlakshitha/motionkit](https://github.com/notlakshitha/motionkit).
