"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./DigitalSolutionsHero.module.css";

interface DigitalSolutionsHeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function DigitalSolutionsHero({
  eyebrow,
  title,
  subtitle,
}: DigitalSolutionsHeroProps) {
  const blobRefs = useRef<HTMLDivElement[]>([]);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 90,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      });
    }

    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.95,
        delay: 0.16,
        ease: "power3.out",
      });
    }

    const rand = gsap.utils.random;

    const computeRange = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      return {
        x: w * 0.38,
        y: h * 0.28,
      };
    };

    const animateBlob = (blob: HTMLDivElement) => {
      if (prefersReduced) return;

      const { x, y } = computeRange();

      gsap.to(blob, {
        x: rand(-x, x),
        y: rand(-y, y),
        scale: rand(0.84, 1.18),
        rotation: rand(-18, 18),
        duration: rand(8, 15),
        ease: "sine.inOut",
        onComplete: () => animateBlob(blob),
      });
    };

    blobRefs.current.forEach((blob, i) => {
      if (!blob) return;

      gsap.set(blob, { x: 0, y: 0, rotation: 0 });

      if (!prefersReduced) {
        gsap.to(blob, {
          x: rand(-80, 80),
          y: rand(-60, 60),
          scale: rand(0.94, 1.08),
          duration: rand(1.2, 2.2),
          ease: "power2.out",
          delay: i * 0.05,
          onComplete: () => animateBlob(blob),
        });
      }
    });

    const glow = mouseGlowRef.current;
    const quickX = glow
      ? gsap.quickTo(glow, "x", { duration: 0.3, ease: "power3.out" })
      : null;
    const quickY = glow
      ? gsap.quickTo(glow, "y", { duration: 0.3, ease: "power3.out" })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!quickX || !quickY) return;
      quickX(e.clientX - 320);
      quickY(e.clientY - 320);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      blobRefs.current.forEach((blob) => blob && gsap.killTweensOf(blob));
      if (glow) gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.noise} />

      <div className={styles.background}>
        {[0, 1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={styles.blob}
            ref={(el) => {
              if (el) blobRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <div ref={mouseGlowRef} className={styles.mouseGlow} />

      <div className={styles.content}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}

        {title ? (
          <h1 ref={titleRef} className={styles.title}>
            {title}
          </h1>
        ) : null}

        {subtitle ? (
          <p ref={subtitleRef} className={styles.subtitle}>
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className={styles.bottomLine} />
    </section>
  );
}