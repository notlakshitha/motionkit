# Bento signal

Build an original feature bento for a fictional stills archive called Reelhouse. Five ideas, not a generic SaaS feature list.

## Cells

1. `Index every frame` — wide cell with an SVG sparkline. The stroke is drawn once with `stroke-dashoffset`, brass `#e7b267`.
2. `Color notes` — three swatches: brass, sea glass, paper.
3. `48k stills` — a large serif figure.
4. `Quiet search` — a pill that reads `sodium coast` with a static caret.
5. `Shared reels` — four overlapping initial circles: A, M, S, J.

Use a 4-column grid on desktop. The first cell spans two columns and two rows. Cards are `rounded-2xl`, hairline white borders, `bg-white/[0.03]`, page background `#0d0d0f`.

## Motion

With the `motion` package, fade and rise each cell when it enters the viewport, once, with a short stagger. Under `prefers-reduced-motion`, skip the offset and show the cells immediately. The chart stroke should also finish instantly under reduced motion.

Heading: eyebrow `REELHOUSE`, serif title `The desk that keeps the frames.`

## Done when

The grid reads as one instrument panel, the line draws in, and reduced motion shows the finished grid without waiting.
