# Horizon veil background

Build an original full-bleed background called Horizon Veil. It is a night field with one hot horizon and two thin ribbons. Do not recreate a generic aurora blob.

## Stack

- React client component for the shell
- A separate module that mounts an OGL full-screen triangle
- The GL module is `import()`ed only after the section intersects the viewport
- Children are optional; render a default caption if none are passed

## Static fallback, always present

Paint this in CSS so the section looks finished before the shader, and forever if the shader never starts:

- Base `#07090e`
- A blurred copper ellipse sitting low, gently rising and falling
- A 1px cream horizon line
- Faint vertical streaks masked so they exist only above the horizon

Stop the CSS motion under `prefers-reduced-motion`.

## Shader

Lazy-load it. Do not load it in preview mode or when reduced motion is requested.

Fragment shader behavior:

- Dark top, slightly warmer mid
- A horizon near 33% height that breathes with a slow sine
- A cream core and a copper falloff
- Two ribbons above the horizon, one tide-colored and one copper, each with its own phase
- Very faint vertical veils
- Fine grain and a vignette

Resize with the parent. On cleanup, cancel the frame and release the WebGL context. If the import throws, hide the canvas and leave the CSS.

## Default caption

Eyebrow `HORIZON VEIL`. Serif headline `Night, and a line of heat.`

## Done when

The CSS horizon is visible on first paint, the shader covers it only after scroll-into-view, and a reduced-motion visit never downloads the GL module.
