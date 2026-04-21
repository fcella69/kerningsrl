"use client";

import { useEffect } from "react";

export default function PerformanceMode() {
  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const isSmallScreen = window.innerWidth <= 900;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || isSmallScreen || prefersReducedMotion) {
      document.body.classList.add("performance-mode");
    } else {
      document.body.classList.remove("performance-mode");
    }
  }, []);

  return null;
}