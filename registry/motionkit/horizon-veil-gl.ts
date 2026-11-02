import { Mesh, Program, Renderer, Triangle } from "ogl"

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float y = uv.y;
  vec3 top = vec3(0.025, 0.03, 0.045);
  vec3 mid = vec3(0.07, 0.055, 0.07);
  vec3 col = mix(top, mid, smoothstep(0.0, 0.72, y));

  float horizon = 0.33 + 0.012 * sin(uv.x * 5.5 + uTime * 0.18);
  float heat = exp(-pow((y - horizon) * 8.5, 2.0));
  col += vec3(0.96, 0.78, 0.55) * heat * 0.5;
  col += vec3(0.82, 0.38, 0.16) * exp(-pow((y - horizon) * 3.0, 2.0)) * 0.42;

  float ribbon = sin(uv.x * 3.2 + uTime * 0.24) * 0.055;
  float rib = exp(-pow((y - (horizon + 0.09 + ribbon)) * 16.0, 2.0));
  col += vec3(0.32, 0.7, 0.66) * rib * 0.5;

  float ribbonB = sin(uv.x * 6.0 - uTime * 0.16 + 1.4) * 0.04;
  float ribB = exp(-pow((y - (horizon + 0.18 + ribbonB)) * 22.0, 2.0));
  col += vec3(0.78, 0.42, 0.24) * ribB * 0.38;

  float veil = smoothstep(0.48, 0.0, abs(fract(uv.x * 8.0 + sin(uTime * 0.07 + y * 2.2)) - 0.5));
  col += vec3(0.45, 0.75, 0.7) * veil * smoothstep(horizon, horizon + 0.5, y) * 0.045 * (1.0 - y);

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime * 12.0) * 43758.5453);
  col += (grain - 0.5) * 0.04;

  vec2 vigUv = (uv - 0.5) * vec2(1.15, 1.0);
  col *= smoothstep(1.2, 0.28, length(vigUv));

  gl_FragColor = vec4(col, 1.0);
}
`

export function mountHorizonVeil(canvas: HTMLCanvasElement) {
  const renderer = new Renderer({
    canvas,
    alpha: false,
    antialias: false,
    dpr: Math.min(window.devicePixelRatio || 1, 1.5),
  })
  const gl = renderer.gl
  gl.clearColor(0.03, 0.035, 0.05, 1)

  const geometry = new Triangle(gl)
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [1, 1] },
    },
  })
  const mesh = new Mesh(gl, { geometry, program })

  const resize = () => {
    const parent = canvas.parentElement
    const rect = parent?.getBoundingClientRect()
    const width = Math.max(1, rect?.width ?? window.innerWidth)
    const height = Math.max(1, rect?.height ?? window.innerHeight)
    renderer.setSize(width, height)
    const resolution = program.uniforms.uResolution
    if (resolution) resolution.value = [canvas.width, canvas.height]
  }

  resize()
  const start = performance.now()
  let frame = 0
  const loop = (now: number) => {
    const time = program.uniforms.uTime
    if (time) time.value = (now - start) / 1000
    renderer.render({ scene: mesh })
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)

  const observer = new ResizeObserver(resize)
  if (canvas.parentElement) observer.observe(canvas.parentElement)

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    gl.getExtension("WEBGL_lose_context")?.loseContext()
  }
}
