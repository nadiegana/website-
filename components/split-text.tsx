"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText as GSAPSplitText } from "gsap/SplitText"
import React, { type JSX } from "react" // Import React to use JSX

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

interface SplitTextProps {
  text: string
  className?: string
  delay?: number // Stagger delay in seconds
  duration?: number
  ease?: string
  splitType?: "chars" | "words" | "lines"
  from?: object
  to?: object
  threshold?: number
  rootMargin?: string
  textAlign?: "left" | "center" | "right" | "justify"
  onLetterAnimationComplete?: () => void
  tag?: keyof JSX.IntrinsicElements // New prop for custom tag
}

const SplitText = ({
  text,
  className = "",
  delay = 0.05, // Default stagger delay in seconds
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left", // Default to left for general use
  onLetterAnimationComplete,
  tag = "p", // Default tag is 'p'
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null)
  const animationCompletedRef = useRef(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return

    const el = ref.current
    animationCompletedRef.current = false

    let splitter: GSAPSplitText | null = null
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: splitType === "lines", // Absolute positioning for lines for better control
        linesClass: "split-line",
      })
    } catch (error) {
      console.error("Failed to create SplitText:", error)
      return
    }

    let targets: HTMLElement[] = []
    switch (splitType) {
      case "lines":
        targets = splitter.lines
        break
      case "words":
        targets = splitter.words
        break
      case "chars":
        targets = splitter.chars
        break
      default:
        targets = splitter.chars
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation, reverting.")
      splitter.revert()
      return
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity"
    })

    const startPct = (1 - threshold) * 100
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
    const marginValue = marginMatch ? Number.parseFloat(marginMatch[1]) : 0
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px"
    const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`
    const start = `top ${startPct}%${sign}`

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true
        gsap.set(targets, {
          ...to,
          clearProps: "willChange", // Clear GSAP inline styles after animation
          immediateRender: true,
        })
        onLetterAnimationComplete?.()
      },
    })

    tl.set(targets, { ...from, immediateRender: false, force3D: true })
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay, // Use delay directly as it's already in seconds
      force3D: true,
    })

    return () => {
      tl.kill()
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
      gsap.killTweensOf(targets)
      if (splitter) {
        splitter.revert() // Revert SplitText changes
      }
    }
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete, tag])

  // Render the specified tag
  return React.createElement(
    tag,
    {
      ref: ref,
      className: `split-parent ${className}`,
      style: {
        textAlign,
        overflow: "hidden",
        display: tag === "span" ? "inline-block" : "block", // Adjust display based on tag
        whiteSpace: "normal",
        wordWrap: "break-word",
        // Removed visibility: "hidden" here. Initial opacity from 'from' prop will handle hiding.
      },
    },
    text,
  )
}

export default SplitText
