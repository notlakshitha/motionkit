# Logo marquee

Build an original infinite ribbon of fictional studios. Do not use real company names or logos.

## Marks

Northline, Kelp & Co, Vellum, Arcadia Lab, Sable, Juniper, Halden, Mira Form.

Each item is a circular monogram (first letter, brass hairline) plus the name in tracked uppercase. Invent only these names.

## Motion

Duplicate the list and translate the track from `0` to `-50%` on a 32s linear loop. Pause the animation while the ribbon is hovered. Edge-to-edge, with a hairline rule above and below.

Section title, above the ribbon: eyebrow `ON THE REEL`, serif headline `Studios that keep the lights low.` Background `#090909`.

## Reduced motion

If `prefers-reduced-motion: reduce`, do not duplicate the list and do not animate. Lay the eight studios out in a wrapping row. That static row is the fallback.

## Done when

The ribbon loops seamlessly, pauses on hover, and becomes a still wrap under reduced motion.
