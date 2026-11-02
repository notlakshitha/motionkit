# Orbit objects hero

Build an original hero called Orbit Objects: a dark studio with three floating forms. Do not reproduce a stock 3D landing template.

## Stack

- Next.js client components
- `three`, `@react-three/fiber`, `@react-three/drei`
- Load the canvas with `next/dynamic` and `ssr: false`
- Wrap it in a React error boundary that renders nothing on failure

## Always-on fallback

The section background is `#0c0d11` with a faint central glow. Before WebGL, and whenever WebGL is skipped, show three CSS shapes:

- A pewter sphere (radial gradient, slow spin)
- A copper triangle via `clip-path`
- A small sea-glass bead

These shapes stay in the DOM under the canvas.

## WebGL scene

Skip the canvas when `prefers-reduced-motion: reduce` is set, and also when a `preview` prop is true (gallery thumbnails must not start a context).

When it mounts:

- Camera around `[0, 0.15, 5.1]`, fov 40, transparent canvas
- Warm key light and a cool rim light
- A silver torus knot, a copper octahedron, and a pale sphere
- `Float` from drei plus a slow `useFrame` rotation
- Cap pixel ratio at 1.6

## Type

Anchored to the bottom over a fade:

- Eyebrow `KEPLER ROOM`
- Serif headline `Objects, holding still in motion.`
- One sentence explaining that the still shapes remain if the scene cannot start

## Done when

The page paints the CSS studio immediately, the 3D scene replaces it only after the chunk loads, and reduced motion never requests the WebGL module.
