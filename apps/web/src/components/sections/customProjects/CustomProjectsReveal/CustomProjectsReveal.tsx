"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import gsap from "gsap";

type CustomProjectsRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
}>;

export default function CustomProjectsReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: CustomProjectsRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(element, { opacity: 0, y });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) return;

        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          clearProps: "transform",
        });

        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}