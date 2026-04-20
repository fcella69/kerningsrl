"use client";

import { useEffect, useRef } from "react";
import type { ContactQuickItem } from "../types";
import styles from "./ContactHero.module.css";

type ContactHeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  quickContacts?: ContactQuickItem[];
};

export default function ContactHero({
  eyebrow,
  title,
  subtitle,
  quickContacts = [],
}: ContactHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    const blobs = blobRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!hero || !glow || blobs.length === 0) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let frameId = 0;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const phases = [0, 1.4, 2.7, 3.8];
    const ampsX = [34, 26, 42, 22];
    const ampsY = [22, 36, 24, 32];

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const handleMouseLeave = () => {
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
    };

    const animate = (time: number) => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      glow.style.transform = `translate3d(${currentX - 320}px, ${currentY - 320}px, 0)`;

      const t = time * 0.00035;

      blobs.forEach((blob, index) => {
        const phase = phases[index] ?? 0;
        const moveX = Math.sin(t + phase) * (ampsX[index] ?? 20);
        const moveY = Math.cos(t * 1.15 + phase) * (ampsY[index] ?? 20);

        blob.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.background} aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            ref={(el) => {
              blobRefs.current[index] = el;
            }}
            className={styles.blob}
          />
        ))}
      </div>

      <div ref={glowRef} className={styles.mouseGlow} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.content}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}

        {title ? <h1 className={styles.title}>{title}</h1> : null}

        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}

        {quickContacts.length > 0 ? (
          <div className={styles.quickGrid}>
            {quickContacts.map((item, index) => {
              const key = item._key ?? `${item.label}-${index}`;
              const isExternal = item.href?.startsWith("http");

              return (
                <div className={styles.quickCard} key={key}>
                  {item.label ? (
                    <span className={styles.quickLabel}>{item.label}</span>
                  ) : null}

                  {item.value ? (
                    item.href ? (
                      <a
                        className={styles.quickValue}
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.quickValue}>{item.value}</span>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className={styles.bottomLine} aria-hidden="true" />
    </section>
  );
}