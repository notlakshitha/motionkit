# Scroll text reveal

Build an original section that lights a sentence word by word as it scrolls. Do not use a pinned horizontal scroll or a letter-scramble effect.

## Copy

Split this sentence on spaces and render each word as an inline-block:

"We cut the night into frames, then give each frame a place to breathe, a color to keep, and a name you can find in the dark."

Eyebrow: `MANIFEST`. Type is large serif, paper on `#090909`. The section is about 150vh so there is room to scrub.

## Motion

Words start fully visible (progressive enhancement). After GSAP and ScrollTrigger load, set them to opacity 0.16 and tween them to 1 with `scrub: true` while the section moves through the viewport. Stagger the words. Clean up the GSAP context on unmount, including when the import resolves after the component has gone.

If `prefers-reduced-motion: reduce`, do not import GSAP. Leave every word at full opacity.

## Preview mode

When a `preview` prop is true, do not attach ScrollTrigger. Instead, cycle word opacity with a CSS keyframe and a small per-word delay so a short card still feels alive. Reduced motion disables that animation too.

## Done when

Scrolling brightens the sentence in order, a no-JS view shows the full sentence, and reduced motion never hides the words.
