# Ember mesh background

Build an original CSS background called Ember Mesh. No canvas, no video, no images.

## Scene

Coal field `#100c0a`. Three blurred radial orbs move on long, independent loops:

- Hot orange, upper left
- Pale gold, mid right
- Deep rust, lower left

Over that, a 72px grid of hairline lines, masked with a radial gradient so the grid fades before the edges.

Stop every animation under `prefers-reduced-motion: reduce`. The orbs simply sit where they started. That still state is the fallback and the reduced-motion design. It should still look composed.

## Content

Accept `children`. If none are passed, show:

- Eyebrow `EMBER MESH`
- Serif headline `A pulse under the coal.`

Use `var(--font-serif), Georgia, serif`.

## Done when

The background loops slowly, never depends on JavaScript to be visible, and becomes a still image under reduced motion.
