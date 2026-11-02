# Glass refraction hero

Build an original React hero called Glass Refraction. Do not copy a known glassmorphism template. The point is a smoked panel sitting in front of a word that has been optically bent.

## Stack

- React client component and Tailwind
- One inline SVG filter (`feTurbulence` + `feDisplacementMap`)
- CSS keyframes only. No WebGL

## Scene

Viewport background `#0c0b10`. Two large blurred orbs drift slowly: a brass orb and a muted sea-glass orb. Give each its own 18–22s ease-in-out loop.

Behind the panel, set a huge serif word, `Halcyon`, in very low-contrast white. Apply the displacement filter to that word only. Use `useId` so the filter id is unique. Under reduced motion, set the displacement scale to 0 and stop the orb loops.

Center a real glass card:

- `rounded-[28px]`, white border at about 25% opacity, `bg-white/10`, `backdrop-blur-xl`
- A sheen pseudo-layer (a translucent vertical band) translates across the card on a 5.5s loop
- Eyebrow `LUMEN ATELIER`
- Serif headline: `Glass that keeps a little of the light.`
- Short body copy for a fictional instrument house
- Buttons: `View the glass` and `Book a sitting`

Stop the sheen and orb animations when `prefers-reduced-motion: reduce`.

## Done when

The card is readable, the word behind it looks slightly warped, the sheen crosses and returns, and reduced motion leaves a still, sharp composition.
