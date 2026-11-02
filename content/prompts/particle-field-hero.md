# Particle Field hero

Build an original React hero called Particle Field. Do not imitate any existing motion library, template, or named section. Invent the layout from this brief.

## Stack

- React client component, Tailwind utility classes
- A 2D canvas for the field. No WebGL, no image assets
- Respect `prefers-reduced-motion`

## Scene

Full-viewport ink background (`#07080c`). Behind the canvas, paint a static fallback: two soft radial washes (brass at the upper left, cool gray-blue at the lower right) and five small dots. If the canvas context is missing, that fallback is the whole effect.

On the canvas, draw about 110 points. Each point drifts slowly and bounces inside the parent. When two points are closer than roughly 120 pixels, stroke a line whose opacity fades with distance. Lines are brass (`rgba(214, 168, 96, …)`), points are warm paper white. A pointer inside the section gently pushes nearby points away. On a small preview, use about 40 points and a shorter link distance.

Pause the animation loop when `prefers-reduced-motion: reduce` is set, but still paint one frame so the field is visible. Recompute the canvas size with a `ResizeObserver` and cap device pixel ratio around 1.75.

## Type

Bottom or vertically centered, left aligned:

- Eyebrow: `ATLAS FIELD`
- Headline, serif: `Quiet sky, loud signal.`
- One sentence of body copy about distance and a single invitation
- Two buttons: `Enter the field` (paper fill) and `Read the notes` (ghost)

Use `font-family: var(--font-serif), Georgia, serif` for the headline. Decorative canvas is `aria-hidden`. The section has an accessible name.

## Done when

The field moves on its own, reacts slightly to the pointer, freezes under reduced motion, and still reads as a composed hero if canvas never starts.
