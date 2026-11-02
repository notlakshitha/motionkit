"use client"

import type { ComponentType } from "react"
import { BeamCta } from "@/registry/motionkit/beam-cta"
import { BentoSignal } from "@/registry/motionkit/bento-signal"
import { EmberMesh } from "@/registry/motionkit/ember-mesh"
import { GlassRefractionHero } from "@/registry/motionkit/glass-refraction-hero"
import { HorizonVeil } from "@/registry/motionkit/horizon-veil"
import { LaunchReel } from "@/registry/motionkit/launch-reel"
import { LogoMarquee } from "@/registry/motionkit/logo-marquee"
import { OrbitObjectsHero } from "@/registry/motionkit/orbit-objects-hero"
import { ParticleFieldHero } from "@/registry/motionkit/particle-field-hero"
import { PricingRise } from "@/registry/motionkit/pricing-rise"
import { ScrollTextReveal } from "@/registry/motionkit/scroll-text-reveal"
import { SpotlightFollow } from "@/registry/motionkit/spotlight-follow"

const views: Record<string, ComponentType<{ preview?: boolean }>> = {
  "particle-field-hero": ParticleFieldHero,
  "glass-refraction-hero": GlassRefractionHero,
  "orbit-objects-hero": OrbitObjectsHero,
  "horizon-veil": HorizonVeil,
  "ember-mesh": EmberMesh,
  "scroll-text-reveal": ScrollTextReveal,
  "bento-signal": BentoSignal,
  "spotlight-follow": SpotlightFollow,
  "logo-marquee": LogoMarquee,
  "pricing-rise": PricingRise,
  "beam-cta": BeamCta,
  "launch-reel": LaunchReel,
}

export function BlockView({ slug, preview = false }: { slug: string; preview?: boolean }) {
  const View = views[slug]
  if (!View) return null
  return <View preview={preview} />
}
