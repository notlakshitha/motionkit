# Spotlight follow

Build an original section where a warm pool of light tracks the pointer across four chapters. No canvas.

## Chapters

1. Arrival — The room is already dim when you step in.
2. The long cut — One take, held until the grain starts to speak.
3. Color quiet — Sodium, ink, and a pale window left open.
4. Credits — Names arrive like lights along a platform.

Dark stage `#090909`. Cards are translucent with a hairline border. Eyebrow `CHAPTERS`. Serif headline `Where the light lands.`

## Light

Register two custom properties, `--sx` and `--sy`, with `@property` so they can interpolate. A full-bleed overlay uses:

`radial-gradient(380px circle at var(--sx) var(--sy), rgba(244, 228, 196, 0.22), transparent 62%)`

On pointer move, set the properties from the pointer position inside the section. Do not store the position in React state.

In a `preview` prop mode, animate `--sx` and `--sy` on an 8s loop so the thumbnail moves on its own.

If `prefers-reduced-motion: reduce`, do not follow the pointer and do not run the loop. Leave the pool parked near the upper left.

## Done when

Moving across the section shifts the light, cards stay readable, and reduced motion is a still spotlight.
