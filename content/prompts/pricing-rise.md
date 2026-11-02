# Pricing rise

Build an original three-seat price section for a fictional screening room. No toggle, no comparison table.

## Plans

- Aisle — $0 — A single screening. Points: One seat, Evening program, Printed notes.
- Balcony — $18 — The seat we keep lit. Points: Reserved row, Color stills, Quiet bar. This card is featured.
- Gallery — $42 — A room of your own. Points: Private hour, Projectionist, After-notes.

Background `#0c0b0a`. Cards have hairline borders. The featured card is wrapped in a rotating conic-gradient rim (brass wedge on transparent) clipped by `overflow-hidden` and 1px of padding. The inner panel is `#16130f`.

## Motion

Use `motion` to rise each card into view once. Count the price from 0 to its target with `animate` when the card is in view, writing the number into a span so React state is not involved. Prefix a small `$`.

Under `prefers-reduced-motion`, show the final prices immediately, skip the rise, and do not spin the rim. A static brass edge is enough; you can leave the gradient without rotation.

Eyebrow `SEATS`. Serif headline `Choose how close you sit.` Each card ends with a button `Take {name}`.

## Done when

The middle card is clearly the one that is lit, numbers arrive once, and reduced motion is calm and complete.
