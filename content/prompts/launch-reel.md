# Launch reel

Build an original full landing page for a fictional night train, Vesper Line. It is one self-contained component, not a collage of other blocks. Do not borrow layout from a known product page.

## Opening card

Full viewport, background `#0b0c10`, a faint brass glow at the top.

- Top row: `VESPER LINE` and `23:41`, tracked uppercase
- Eyebrow `NIGHT SERVICE`
- Enormous serif title, `Vesper` and an italic `Line`
- Bottom route: `Harbor → Glass City`
- A soft horizontal scan, a translucent band, travels down the card on a 7s loop

## Stations

A hairline ribbon of station names, duplicated, translating forever: Harbor, Saltworks, Low Bridge, Kiln, Glass City.

## Chapters

Three columns:

1. Boarding — The platform is lit like a darkroom. You step on without a queue, and the door closes on a soft latch.
2. The coast — Windows turn the water into a strip of sodium and black. Nobody narrates it. The glass does the work.
3. Arrival — Glass City comes in as a low chord, not an announcement. The lights outside match the ones inside.

Fade them up with `motion` when they enter. Once only.

## Close

A border-top band. Serif line `The last carriage is still open.` Button `Reserve a window`.

## Reduced motion and preview

Under `prefers-reduced-motion`, no scan, no ribbon movement, no fade offset. Everything is present.

A `preview` prop renders only the opening card, filling its parent, so a gallery thumbnail stays a title card.

## Done when

The page reads as one night journey from title to reservation, and reduced motion is a still editorial page.
